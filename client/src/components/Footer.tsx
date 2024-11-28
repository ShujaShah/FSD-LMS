import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 LMS. All Rights Reserved.</p>
      <div className=" footer__links">
        {['About', 'Contact', 'Privacy Policy', 'Licensing'].map((item) => (
          <Link
            key={item}
            className="footer__link"
            href={`${item.toLowerCase().replace(' ', '-')}`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
