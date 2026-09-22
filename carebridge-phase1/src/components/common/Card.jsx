export default function Card({ children, className = "", padding = "p-5", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`rounded-card border border-line bg-white ${padding} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
