import Image from "next/image";

const Logo = () => {
  return (
      <div className="flex w-[110px] cursor-pointer">
        <Image
          src="/assets/klarify-logo.png"
          alt="Logo"
          width={110}
          height={34}
        />
      </div>
  );
};

export default Logo;
