export function SplashScreen({ text }) {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-3'>
        
        <div className='relative w-10 h-10'>
          <div className='absolute inset-0 border-2 border-gray-200 rounded-full' />
          <div className='absolute inset-0 border-2 border-blue-950 rounded-full border-t-transparent animate-spin' />
        </div>

        {text && (
          <div className='text-sm text-gray-500 font-medium'>
            {text}
          </div>
        )}

      </div>
    </div>
  );
}