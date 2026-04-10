import React from "react";

interface UPMLogoProps {
  size?: number;
  className?: string;
}

// Official UPM Logo from UPM-ID Portal
const UPM_LOGO_URL = "https://upm-id-portal.upm.edu.my/sso/images/logoupm.png";

const UPMLogo: React.FC<UPMLogoProps> = ({ size = 48, className = "" }) => {
  return (
    <img
      src={UPM_LOGO_URL}
      alt="Universiti Putra Malaysia Logo"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: "contain",
      }}
    />
  );
};

export default UPMLogo;
