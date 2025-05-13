import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-300 text-white py-10">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div>
            <h2 className="text-3xl font-semibold text-white uppercase">
              Med Camp
            </h2>
            <p className="mt-4 text-sm text-white">
              Join us in our mission to provide medical support where it's
              needed most. Our campaigns bring health to communities in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/available-campaigns" className="text-white">
                  Available Campaigns
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-4 text-sm text-white">
              Email: <span className="text-white ">contact@medcamp.com</span>
            </p>
            <p className="mt-1 text-sm text-white">
              Phone: <span className="text-white ">+1 (800) 123-4567</span>
            </p>
            <div className="mt-4 flex space-x-4">
              <Link to="#" className="text-white ">
                <FaFacebookF size={20} />
              </Link>
              <Link to="#" className="text-white ">
                <FaTwitter size={20} />
              </Link>
              <Link to="#" className="text-white ">
                <FaInstagram size={20} />
              </Link>
              <Link to="#" className="text-white ">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          {/* Newsletter / Subscribe Section */}
          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="mt-4 text-sm text-white">
              Subscribe to our newsletter for the latest campaign updates and
              medical news.
            </p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 text-sm rounded bg-gray-800 text-gray-300 focus:ring-2 focus:ring-green-500"
              />
              <button className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-white">
          <p>
            &copy; {new Date().getFullYear()} Med Camp. All rights reserved.{" "}
            <span className="text-gray-900">FNH NAF</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
