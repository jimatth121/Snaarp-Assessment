import { type ReactNode, useId } from "react";
import { Globe } from "lucide-react";

function BrandIcon({
  children,
  className = "",
  iconClassName = "h-[21px] w-[21px]",
}: {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  return <span className={`inline-flex items-center justify-center ${className}`}>{children}</span>;
}

export function ChromeBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#EA4335" d="M12 12 21.5 12A9.5 9.5 0 0 0 8.2 3.3Z" />
        <path fill="#FBBC05" d="M12 12 7.2 20.3A9.5 9.5 0 0 0 21.5 12Z" />
        <path fill="#34A853" d="M12 12 8.2 3.3A9.5 9.5 0 0 0 7.2 20.3Z" />
        <circle cx="12" cy="12" r="4.2" fill="#4285F4" stroke="#fff" strokeWidth="1.2" />
      </svg>
    </BrandIcon>
  );
}

export function GmailBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#EA4335" d="M3 7.5 12 14l9-6.5V18a2 2 0 0 1-2 2h-1V10.2L12 14.3 6 10.2V20H5a2 2 0 0 1-2-2Z" />
        <path fill="#4285F4" d="M21 6.5V8l-9 6-9-6V6.5A2 2 0 0 1 5 4.5h.6L12 9.3l6.4-4.8H19a2 2 0 0 1 2 2Z" />
        <path fill="#34A853" d="M18.4 4.5 12 9.3 5.6 4.5Z" />
        <path fill="#FBBC05" d="M6 20V10.2L3 7.5V18a2 2 0 0 0 2 2Z" />
      </svg>
    </BrandIcon>
  );
}

export function FirefoxBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  const a = useId();
  const b = useId();

  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <defs>
          <linearGradient id={a} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7139" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>
          <linearGradient id={b} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#9059FF" />
            <stop offset="100%" stopColor="#4F33D1" />
          </linearGradient>
        </defs>
        <path fill={`url(#${b})`} d="M18.7 6.2c-1.4-2.2-4.4-3.6-7-3.1 1 .3 1.8.8 2.5 1.6-2.2-.6-4.8.2-6.3 2.1A8.2 8.2 0 0 0 6 11.9c0 3.9 2.7 6.8 6.5 6.8 3.5 0 5.9-2.1 5.9-5.2 0-1.4-.5-2.5-1.4-3.4.7-.8 1.4-2.1 1.7-3.9Z" />
        <path fill={`url(#${a})`} d="M10.1 7.2c-1.9.5-3.4 2.3-3.4 4.8 0 2.9 2.2 5 5.1 5 2.6 0 4.5-1.5 4.5-3.8 0-1.9-1.2-3.2-3.1-3.5.5.4.8 1 .8 1.8 0 1.4-1 2.4-2.4 2.4-1.6 0-2.7-1.2-2.7-2.9 0-1.4.5-2.7 1.2-3.8Z" />
      </svg>
    </BrandIcon>
  );
}

export function InstagramBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  const gradientId = useId();

  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="35%" stopColor="#FEDA77" />
            <stop offset="60%" stopColor="#DD2A7B" />
            <stop offset="82%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#${gradientId})`} />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
      </svg>
    </BrandIcon>
  );
}

export function XBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#111111" d="M4.2 4h3.7l4.3 6.1L17.3 4H20l-6.6 7.4L20.3 20h-3.8l-4.6-6.6L6.2 20H3.5l6.9-7.8Z" />
      </svg>
    </BrandIcon>
  );
}

export function FacebookBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.8v-8.4H7v-3.4h3.1V9.4c0-3.1 1.8-4.8 4.6-4.8 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 1.9v2.3h3.5l-.6 3.4H14v8.4A12 12 0 0 0 24 12Z" />
      </svg>
    </BrandIcon>
  );
}

export function WhatsAppBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <circle cx="12" cy="12" r="9" fill="#25D366" />
        <path fill="#fff" d="M8.9 7.8c-.3-.7-.5-.7-.8-.7h-.7c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.2 3.6 5.4 4.8 2.6 1 3.2.8 3.8.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.1-.5-.2-1-.5s-1.2-.6-1.4-.6c-.2-.1-.4-.1-.6.2-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.4.4-.6.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.1-.5-1.3-.9-2Z" />
      </svg>
    </BrandIcon>
  );
}

export function YouTubeBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="#FF0000" />
        <path fill="#fff" d="M10 9.1v5.8l5-2.9Z" />
      </svg>
    </BrandIcon>
  );
}

export function OperaMiniBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#D71920" d="M12 3.5c-4.5 0-7.9 3.8-7.9 8.5s3.4 8.5 7.9 8.5c2.3 0 4.3-.9 5.8-2.3-1 .4-2.1.6-3.2.6-4 0-7-3.1-7-6.8s3-6.8 7-6.8c1.1 0 2.2.2 3.2.6C16.3 4.4 14.3 3.5 12 3.5Z" />
        <path fill="#F44336" d="M19.9 12c0 4.7-3.4 8.5-7.9 8.5-4 0-7-3.1-7-6.8s3-6.8 7-6.8c4.5 0 7.9 3.8 7.9 8.5Zm-7.9-4.4c-2 0-3.5 1.9-3.5 4.4s1.5 4.4 3.5 4.4 3.5-1.9 3.5-4.4-1.5-4.4-3.5-4.4Z" />
      </svg>
    </BrandIcon>
  );
}

export function TeamsBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <circle cx="17.5" cy="8" r="2.5" fill="#7B83EB" />
        <circle cx="8" cy="9" r="2.2" fill="#6364D8" />
        <path fill="#5B5FC7" d="M10 7h7.2a1.3 1.3 0 0 1 1.3 1.3v8.4a1.3 1.3 0 0 1-1.3 1.3H10Z" />
        <path fill="#4B4FC1" d="M5.5 8.5h7.7v8H6.8a1.3 1.3 0 0 1-1.3-1.3Z" />
        <path fill="#fff" d="M8.3 10.3h2.8v1.2h-.8v3.7H9v-3.7h-.7Z" />
      </svg>
    </BrandIcon>
  );
}

export function WindowsBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#00A4EF" d="M3 5.2 11 4v7.2H3Zm9 0L21 4v7.2h-9ZM3 12.2h8V20L3 18.8Zm9 0h9V20l-9-1.2Z" />
      </svg>
    </BrandIcon>
  );
}

export function AppleBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#2E2E31" d="M15.4 12.4c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.7-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.5 2.2-1.5 2.5-.4 6.3 1 8.4.7 1 1.6 2.1 2.7 2 .9 0 1.3-.6 2.5-.6s1.5.6 2.5.6c1 0 1.8-1 2.4-2 .8-1.2 1.1-2.5 1.1-2.6-.1 0-2.2-.8-2.2-3Zm-2.2-6.3c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.9 2.5.9.1 1.9-.4 2.5-1.2Z" />
      </svg>
    </BrandIcon>
  );
}

export function LinuxBrandIcon({ className = "h-5 w-5", iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <BrandIcon className={className} iconClassName={iconClassName}>
      <svg viewBox="0 0 24 24" className={iconClassName ?? "h-[18px] w-[18px]"}>
        <path fill="#2F3136" d="M12 3.2c-2.2 0-4 2.1-4 4.8 0 1.3.4 2.4 1 3.3-.5.8-1.1 1.8-1.6 2.9-.8 1.9-1.1 3.5-1.1 4.3 0 .5.4.8.9.8h2.1l.8-2.5h3.8l.8 2.5h2.1c.5 0 .9-.3.9-.8 0-.8-.3-2.4-1.1-4.3-.5-1.1-1.1-2.1-1.6-2.9.6-.9 1-2 1-3.3 0-2.7-1.8-4.8-4-4.8Z" />
        <circle cx="10.1" cy="8.4" r="0.9" fill="#fff" />
        <circle cx="13.9" cy="8.4" r="0.9" fill="#fff" />
        <path fill="#F2B636" d="M10.2 11.3c.4.5 1 .8 1.8.8s1.4-.3 1.8-.8c-.4-.3-1-.5-1.8-.5s-1.4.2-1.8.5Z" />
        <path fill="#F2B636" d="M8.8 18.5h1.7l-.5 1.7H8.3c-.4 0-.5-.3-.4-.6Zm6.4 0h-1.7l.5 1.7h1.7c.4 0 .5-.3.4-.6Z" />
      </svg>
    </BrandIcon>
  );
}

export function WebBrandIcon({ name, className = "h-7 w-7", iconClassName = "h-[21px] w-[21px]" }: { name: string; className?: string; iconClassName?: string }) {
  if (name === "Chrome") return <ChromeBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Gmail") return <GmailBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Firefox") return <FirefoxBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Instagram") return <InstagramBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "x.com") return <XBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Facebook") return <FacebookBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "WhatsApp") return <WhatsAppBrandIcon className={className} iconClassName={iconClassName} />;
  return <Globe size={23} className="text-[#222]" />;
}

export function DeviceBrandIcon({ device, className = "h-5 w-5", iconClassName }: { device: string; className?: string; iconClassName?: string }) {
  if (device === "Windows") return <WindowsBrandIcon className={className} iconClassName={iconClassName} />;
  if (device === "Mac") return <AppleBrandIcon className={className} iconClassName={iconClassName} />;
  return <LinuxBrandIcon className={className} iconClassName={iconClassName} />;
}

export function ActivityBrandIcon({ activity, className = "h-5 w-5", iconClassName }: { activity: string; className?: string; iconClassName?: string }) {
  if (activity === "Google Chrome") return <ChromeBrandIcon className={className} iconClassName={iconClassName} />;
  if (activity === "Instagram") return <InstagramBrandIcon className={className} iconClassName={iconClassName} />;
  if (activity === "Microsoft Teams") return <TeamsBrandIcon className={className} iconClassName={iconClassName} />;
  if (activity === "YouTube") return <YouTubeBrandIcon className={className} iconClassName={iconClassName} />;
  if (activity === "WhatsApp") return <WhatsAppBrandIcon className={className} iconClassName={iconClassName} />;
  if (activity === "Opera Mini") return <OperaMiniBrandIcon className={className} iconClassName={iconClassName} />;
  return <Globe size={18} className="text-[#222]" />;
}

export function AppBrandIcon({ name, className = "h-5 w-5", iconClassName }: { name: string; className?: string; iconClassName?: string }) {
  if (name === "Google Chrome") return <ChromeBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "YouTube") return <YouTubeBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Microsoft Teams") return <TeamsBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "WhatsApp") return <WhatsAppBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Instagram") return <InstagramBrandIcon className={className} iconClassName={iconClassName} />;
  if (name === "Opera Mini") return <OperaMiniBrandIcon className={className} iconClassName={iconClassName} />;
  return <Globe size={18} className="text-[#222]" />;
}
