// import React, { useRef, useState } from 'react';
// import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

// const words = 'Wahyu Online PhotoBooth 👋🏻';

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photos, setPhotos] = useState([]);
//   const [countTime, setCountTime] = useState(null);

//   // Aktifkan kamera saat komponen dimuat
//   React.useEffect(() => {
// 	navigator.mediaDevices
// 	  .getUserMedia({ video: true })
// 	  .then((stream) => {
// 		if (videoRef.current) {
// 		  videoRef.current.srcObject = stream;
// 		}
// 	  })
// 	  .catch((error) => console.error('Error accessing camera: ', error));
//   }, []);

//   const takePhotoSequence = () => {
// 	let shots = 4;
// 	let count = 3;
// 	setCountTime(count);

// 	const interval = setInterval(() => {
// 	  count -= 1;
// 	  setCountTime(count);

// 	  if (count === 0) {
// 		captureImage();
// 		shots -= 1;
// 		count = 3;
// 	  }

// 	  if (shots === 0) {
// 		clearInterval(interval);
// 		setCountTime(null);
// 	  }
// 	}, 1000);
//   };

//   const captureImage = () => {
// 	if (videoRef.current && canvasRef.current) {
// 	  const context = canvasRef.current.getContext('2d');
// 	  canvasRef.current.width = videoRef.current.videoWidth;
// 	  canvasRef.current.height = videoRef.current.videoHeight;
// 	  context.drawImage(
// 		videoRef.current,
// 		0,
// 		0,
// 		canvasRef.current.width,
// 		canvasRef.current.height
// 	  );
// 	  const imageData = canvasRef.current.toDataURL('image/png');

// 	  setPhotos((prevPhotos) => {
// 		if (prevPhotos.length >= 4) {
// 		  return [...prevPhotos.slice(1), imageData]; // Hanya simpan 4 foto terbaru
// 		}
// 		return [...prevPhotos, imageData];
// 	  });
// 	}
//   };

//   return (
// 	<div className='min-h-screen flex justify-center items-center bg-black px-4'>
// 	  <div className='flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl w-full mx-auto'>
// 		<div className='flex flex-col items-center text-center gap-6 w-full md:w-1/2'>
// 		  <TextGenerateEffect words={words} />

// 		  {/* Live Camera */}
// 		  <div className='w-full h-[35vh] border-4 border-black rounded-lg shadow-lg flex justify-center items-center bg-white relative'>
// 			<video
// 			  ref={videoRef}
// 			  autoPlay
// 			  playsInline
// 			  className='w-full h-full object-cover rounded-lg'
// 			/>
// 		  </div>

// 		  {/* Take Photo Button */}
// 		  <div className='flex justify-center w-full'>
// 			<button
// 			  onClick={takePhotoSequence}
// 			  className='w-1/2 h-full py-5 px-2 rounded-4xl border-2 border-black text-black bg-white'
// 			>
// 			  Take Photo
// 			</button>
// 		  </div>
// 		</div>

// 		{/* Photo Frames */}
// 		<div className='grid grid-cols-1 gap-4 w-full md:w-1/2 bg-red-500'>
// 		  {Array(4)
// 			.fill(null)
// 			.map((_, index) => (
// 			  <div
// 				key={index}
// 				className='w-2/5 h-[15vh] border-2 border-black rounded-lg shadow-md flex justify-center items-center bg-white'
// 			  >
// 				{photos[index] ? (
// 				  <img
// 					src={photos[index]}
// 					alt={`Gambar ${index + 1}`}
// 					className='w-full h-full object-cover rounded-lg'
// 				  />
// 				) : (
// 				  <span className='text-black'>Gambar {index + 1}</span>
// 				)}
// 			  </div>
// 			))}
// 		</div>
// 		<canvas ref={canvasRef} className='hidden' />
// 		{countTime !== null && (
// 		  <span className='text-black text-5xl font-bold '>{countTime}</span>
// 		)}
// 	  </div>
// 	</div>
//   );
// }
