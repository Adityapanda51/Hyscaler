import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { imagefrombuffer } from "imagefrombuffer";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
    picture: null,
  });

  useEffect(() => {
    // Fetch properties data from the server
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/propertieslist/get"
        );
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error("Failed to fetch properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleEdit = (property) => {
    setEditingProperty(property);
    setEditedData({
      name: property.name,
      price: property.price,
      location: property.location,
      description: property.description,
      picture: property.picture,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditedData((prevData) => ({
        ...prevData,
        picture: file,
      }));
    } else {
      console.error("No file selected");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("price", editedData.price);
      formData.append("location", editedData.location);
      formData.append("description", editedData.description);
      formData.append("picture", editedData.picture);
      console.log(editedData);
      const response = await fetch(
        `http://localhost:8000/api/properties/update/${editingProperty._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      console.log("Update Response:", response);

      if (response.ok) {
        // Update the properties state after successful update
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === editingProperty._id
              ? { ...property, ...editedData }
              : property
          )
        );

        // Clear the editing state
        setEditingProperty(null);
        setEditedData({
          name: "",
          price: "",
          location: "",
          description: "",
          picture: null,
        });
      } else {
        console.error("Failed to update property:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleCancel = () => {
    // Clear the editing state
    setEditingProperty(null);
    setEditedData({
      name: "",
      price: "",
      location: "",
      description: "",
      picture: null,
    });
  };

  const handleDelete = async (propertyId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/properties/delete/${propertyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the properties state after successful delete
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property._id !== propertyId)
        );
      } else {
        console.error("Failed to delete property:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div>
      {properties.map((property) => (
        <div key={property._id} className="card new mb-4 shadow-sm">
          {editingProperty === property ? (
            // Edit form
            <div>
              <input
                type="text"
                placeholder="Name"
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Price"
                value={editedData.price}
                onChange={(e) =>
                  setEditedData({ ...editedData, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={editedData.location}
                onChange={(e) =>
                  setEditedData({ ...editedData, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={editedData.description}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            // Display property details
            <div className="d-flex">
              <div className="col-md-4">
                {property.picture && (
                  <img
                    className="img-fluid property-image"
                    src={imagefrombuffer({
                      type: "image/jpeg",
                      data: property.picture.data,
                    })}
                    alt={property.name}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-1">{property.name}</h5>
                  <p className="card-text fs-2">
                    <strong className="text-info">Price:</strong>{" "}
                    <span className="text-black">{property.price}</span>
                  </p>
                  <p className="card-text fs-2">
                    <strong className="text-info">Location:</strong>{" "}
                    <span className="text-black">{property.location}</span>
                  </p>
                  <p className="card-text fs-2">
                    <strong className="text-info">About this property:</strong>{" "}
                    <span className="text-black">{property.description}</span>
                  </p>
                  <div className="button-container">
                    <button
                      type="button"
                      className="btn btn-primary me-2 btn-sm"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(property._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Properties;
