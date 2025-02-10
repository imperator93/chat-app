export const InputComponent = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) => {
  return (
    <input
      minLength={3}
      maxLength={15}
      required
      style={{
        height: "30px",
        border: "1px solid lightGrey",
        borderRadius: "5px",
        padding: "2px 0px 2px 5px",
        fontSize: "20px",
      }}
      placeholder={placeholder}
      type={type}
    />
  );
};
