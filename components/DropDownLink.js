import Link from 'next/link';
import React from 'react';

const DropDownLink = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default DropDownLink;
