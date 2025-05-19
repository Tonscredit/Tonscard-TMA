const FreeCard = () => {
  return (
    // <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#e6ddc1] via-[#ac9c7f] to-brand-500 pb-4">
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px]  to-brand-500 pb-4">
      <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white to-brand-500 dark:!border-navy-800">
        <img
        src="/img/logo.png"
        style={{
          width:"100%",
          height:"100%"
        }}
        >
        </img>
      </div>

    </div>
  );
};

export default FreeCard;
