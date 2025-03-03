import Link from "next/link";
import Image from "next/image";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link href={url}>
        <div className="flex w-[110px] items-center justify-center">
          <Image src="/assets/klarify-logo.png" alt="Logo" width={110} height={34} />
        </div>
      </Link>
    </div>
  );
};

export default Logo;