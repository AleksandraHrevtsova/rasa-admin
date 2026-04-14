export default function Modal({ children, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'>
        <button
          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}