type Props = React.PropsWithChildren<{
  title: React.ReactNode | undefined;
}>;

const InfoBox = ({ children, title }: Props) => {
  return (
    <div className="w-full h-full bg-teal-100 border-2 border-teal-400 rounded-md flex flex-col space-y-2 p-4">
      {title && <div className="w-full">{title}</div>}
      {children}
    </div>
  );
};

export default InfoBox;
