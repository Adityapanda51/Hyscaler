require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const multer = require("multer");
const Property = require("./models/property"); // Create a 'property' model

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle adding a new property
app.post("/api/properties/add", upload.single("picture"), async (req, res) => {
  try {
    const { name, location, price, description } = req.body;

    // Access the file buffer from the request
    const pictureBuffer = req.file ? req.file.buffer : null;

    // Perform validation and other necessary checks here

    // Save the property data to the database
    const newProperty = new Property({
      name,
      location,
      price,
      description,
      picture: pictureBuffer, // Store the file buffer in your data model
    });

    await newProperty.save();

    res
      .status(201)
      .json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//-------------------------------------------------------
app.get("/api/propertieslist/get", async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();

    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//---------------------------------------------------------

app.delete("/api/properties/delete/:id", async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Use the MongoDB `deleteOne` method to remove the property by ID
    const result = await Property.deleteOne({ _id: propertyId });

    if (result.deletedCount === 1) {
      res.json({ message: "Property deleted successfully" });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//----------------------------------------------------------

//-----------------------------------------------------------
// app.put("/api/properties/update/:id", async (req, res) => {
//   console.log("test", req.body);
//   try {
//     const propertyId = req.params.id;
//     const updateData = req.body; // Assuming you send the updated data in the request body

//     // Use the MongoDB `updateOne` method to update the property by ID
//     const result = await Property.updateOne(
//       { _id: propertyId },
//       { $set: updateData }
//     );

//     if (result.nModified === 1) {
//       res.json({ message: "Property updated successfully" });
//     } else if (result.n === 0) {
//       res.status(404).json({ error: "Property not found" });
//     } else {
//       res.status(500).json({ error: "Failed to update property", result });
//     }
//   } catch (error) {
//     console.error("Error updating property:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.put(
  "/api/properties/update/:id",
  upload.single("picture"),
  async (req, res) => {
    try {
      const propertyId = req.params.id;

      // Find the property by ID
      const existingProperty = await Property.findById(propertyId);

      if (!existingProperty) {
        return res.status(404).json({ error: "Property not found" });
      }

      // Update the property fields
      const { name, location, price, description } = req.body;

      if (name) {
        existingProperty.name = name;
      }

      if (location) {
        existingProperty.location = location;
      }

      if (price) {
        existingProperty.price = price;
      }

      if (description) {
        existingProperty.description = description;
      }

      // Update the picture if a new file is uploaded
      if (req.file) {
        existingProperty.picture = req.file.buffer;
      }

      // Save the updated property to the database
      await existingProperty.save();

      res.json({
        message: "Property updated successfully",
        property: existingProperty,
      });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//-----------------------------------------------
//----------------------------------------------
app.use(errorMiddleware);

const PORT = 8000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
