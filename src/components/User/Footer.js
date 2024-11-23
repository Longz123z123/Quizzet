import { FaFacebook } from 'react-icons/fa'; // Import icon Facebook từ react-icons

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          &copy; {new Date().getFullYear()} Quiz App by Zet1. All Rights Reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/about" className="text-decoration-none" style={{ fontSize: '1.1rem' }}>
              About
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/privacy" className="text-decoration-none" style={{ fontSize: '1.1rem' }}>
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/contact" className="text-decoration-none" style={{ fontSize: '1.1rem' }}>
              Contact Us
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://www.facebook.com/your-facebook-username" // Đặt link Facebook của bạn
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaFacebook
                size={20} // Kích thước icon Facebook
                style={{ marginLeft: '10px', color: '#3b5998' }} // Tô màu xanh cho icon
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
