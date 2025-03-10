import Link from "next/link";
import Image from "next/image";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <Link href={url}>
      <div className="flex w-[110px] cursor-pointer">
        <Image
          src="/assets/klarify-logo.png"
          alt="Logo"
          width={110}
          height={34}
        />
      </div>
    </Link>
  );
};

export default Logo;
