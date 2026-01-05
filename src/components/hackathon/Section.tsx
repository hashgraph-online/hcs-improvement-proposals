import Typography from '../Typography';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ icon, title }) => {
  return (
    <div
      className='relative mb-8'
    >
      <div className='relative w-16 h-16 mx-auto mb-4'>
        <div className='absolute inset-0 rounded-2xl bg-[#8259ef]/10 transform rotate-45'></div>
        <div className='absolute inset-[6px] rounded-xl bg-[#2d84eb]/10 transform rotate-45'></div>
        <div className='absolute inset-[12px] rounded-lg bg-[#3ec878]/10 transform rotate-45'></div>
        <div className='absolute inset-0 flex items-center justify-center text-3xl text-[#8259ef]'>
          {icon}
        </div>
      </div>

      <Typography
        variant='h1'
        className='text-center bg-clip-text text-transparent bg-gradient-to-r from-[#8259ef] via-[#2d84eb] to-[#3ec878]'
      >
        {title}
      </Typography>
    </div>
  );
};
