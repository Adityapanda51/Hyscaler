import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Dream Home Realty!</h1>

      <section>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      <section>
        <h2>Featured Properties</h2>
        <div className="property-list">
          <div className="property">
            <img
              src="https://th.bing.com/th/id/OIP.MqJEETRfjC-r9DTvx5CROgHaEN?rs=1&pid=ImgDetMain"
              alt="Property 1"
              className="property-image"
            />
            <h3>Beautiful Home</h3>
            <p>Price: ₹5000,000</p>
          </div>

          <div className="property">
            <img
              src="https://ssl.cdn-redfin.com/photo/48/mbpaddedwide/605/genMid.160000605_1.jpg"
              alt="Property 2"
              className="property-image"
            />
            <h3>Luxury Villa</h3>
            <p>Price: ₹1,2000,000</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to contact us.</p>
      </section>
    </div>
  );
};

export default Home;
