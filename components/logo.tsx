import Image from "next/image";

const Logo = ({ logoType = "normal" }: { logoType?: "normal" | "white" }) => {
  // Define the logo paths
  const logoSrc =
    logoType === "white" ? "/assets/klarify-logo-white.png" : "/assets/klarify-logo.png";

  return (
    <div className="flex w-[110px] cursor-pointer">
      <Image src={logoSrc} alt="Logo" width={110} height={34} />
    </div>
  );
};

export default Logo;
