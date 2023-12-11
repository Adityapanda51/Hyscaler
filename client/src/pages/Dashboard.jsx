import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    name: "",
    picture: null,
    location: "",
    price: "",
    description: "",
  });

  const [showCard, setShowCard] = useState(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setProperty({
      ...property,
      [name]: file,
    });
  };

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    try {
      // Assuming you have an endpoint to handle property submission
      const formData = new FormData();
      formData.append("name", property.name);
      formData.append("picture", property.picture);
      formData.append("location", property.location);
      formData.append("price", property.price);
      formData.append("description", property.description);

      const response = await fetch("http://localhost:8000/api/properties/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Property added successfully");
        // Handle success, e.g., display a success message, clear the form, etc.
      } else {
        console.error("Failed to add property:", response.statusText);
        // Handle failure, e.g., display an error message, etc.
      }
    } catch (error) {
      console.error("API call error:", error);
      // Handle other errors
    }
  };

  const openCard = () => {
    setShowCard(true);
  };

  const closeCard = () => {
    setShowCard(false);
  };

  const openPropertyList = () => {
    navigate("/properties");
  };

  return (
    <div>
      <nav>
        <div className="row">
          <button
            style={{
              left: "330px",
              top: "100px",
              width: "200px",
              height: "40px",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "5%",
              marginLeft: "130px",
            }}
            onClick={openCard}
          >
            Add New Property
          </button>
          <button
            style={{
              // position: "absolute",

              left: "330px",
              top: "100px",
              width: "200px",
              height: "40px",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "5%",
              marginLeft: "8px",
            }}
            onClick={openPropertyList}
          >
            Property Lists
          </button>
        </div>
      </nav>
      {showCard && (
        <Card
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",

            transform: "translate(-50%, -50%)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 999,
          }}
        >
          <Card.Body style={{ margin: "auto" }}>
            <Form onSubmit={handleSubmit} className="property-form">
              <Form.Group controlId="name">
                <Form.Label>Add New Property</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Property Name"
                  name="name"
                  autoComplete="off"
                  value={property.name}
                  onChange={handleInput}
                />
              </Form.Group>

              <div>
                <label htmlFor="picture">Picture (JPG/PDF)</label>
                <input
                  type="file"
                  name="picture"
                  accept=".jpg, .pdf"
                  onChange={handleFileInput}
                />
              </div>

              <div>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Property Location"
                  id="location"
                  required
                  autoComplete="off"
                  value={property.location}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Property Price"
                  id="price"
                  required
                  autoComplete="off"
                  value={property.price}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  placeholder="Property Description"
                  id="description"
                  value={property.description}
                  onChange={handleInput}
                />
              </div>

              <br />

              <div className="btn-add">
                <Button type="submit">Add Property</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
