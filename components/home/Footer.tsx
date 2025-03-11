import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
              <span>AI Career Builder</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering professionals to advance their careers with AI
              assistance.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="capitalize text-xs">
                        {social.charAt(0)}
                      </span>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Testimonials", "FAQ"],
            },
            {
              title: "Resources",
              links: [
                "Blog",
                "Career Tips",
                "Resume Templates",
                "Interview Guide",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Contact", "Privacy Policy"],
            },
          ].map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AI Career Builder. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}