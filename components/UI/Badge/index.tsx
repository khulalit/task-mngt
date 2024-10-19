import styles from "./styles.module.scss";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info";
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, text }) => {
  return <div className={`${styles.badge} ${styles[variant]}`}>{text}</div>;
};

export default Badge;
