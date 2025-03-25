// import React, { useRef, useState } from 'react';
// import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

// const words = 'Wahyu Online PhotoBooth 👋🏻';

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photos, setPhotos] = useState([]);
//   const [countTime, setCountTime] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   const startCamera = () => {
// 	setIsCameraOn(true);
// 	navigator.mediaDevices
// 	  .getUserMedia({ video: true })
// 	  .then((stream) => {
// 		if (videoRef.current) {
// 		  videoRef.current.srcObject = stream;
// 		}
// 	  })
// 	  .catch((error) => console.error('Error accessing camera: ', error));
//   };

//   const takePhotoSequence = () => {
// 	let shots = 4;
// 	let count = 3;
// 	setCountTime(count);

// 	const interval = setInterval(() => {
// 	  if (count > 0) {
// 		setCountTime(count - 1);
// 		count -= 1;
// 	  }

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
// 		  return [...prevPhotos.slice(1), imageData];
// 		}
// 		return [...prevPhotos, imageData];
// 	  });
// 	}
//   };

//   const downloadPhotoStrip = () => {
// 	if (photos.length === 0) return;

// 	const imgWidth = 250;
// 	const imgHeight = 200;
// 	const gap = 20;
// 	const framePadding = 40;
// 	const borderRadius = 20;

// 	const frameWidth = imgWidth + framePadding * 2;
// 	const frameHeight =
// 	  photos.length * imgHeight + (photos.length - 1) * gap + framePadding * 2;

// 	const stripCanvas = document.createElement('canvas');
// 	const ctx = stripCanvas.getContext('2d');
// 	stripCanvas.width = frameWidth;
// 	stripCanvas.height = frameHeight + 30;

// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillRect(0, 0, frameWidth, frameHeight + 30);

// 	photos.forEach((photo, index) => {
// 	  const img = new Image();
// 	  img.src = photo;
// 	  img.onload = () => {
// 		const xPos = framePadding;
// 		const yPos = framePadding + index * (imgHeight + gap);
// 		ctx.drawImage(img, xPos, yPos, imgWidth, imgHeight);

// 		if (index === photos.length - 1) {
// 		  const date = new Date();
// 		  const dateString = date.toLocaleString('en-US', {
// 			month: '2-digit',
// 			day: '2-digit',
// 			year: 'numeric',
// 			hour: '2-digit',
// 			minute: '2-digit',
// 			hour12: true,
// 		  });
// 		  ctx.fillStyle = '#000';
// 		  ctx.font = '14px Arial';
// 		  ctx.textAlign = 'center';
// 		  ctx.fillText(
// 			`Photobooth ${dateString}`,
// 			frameWidth / 2,
// 			frameHeight + 20
// 		  );

// 		  const link = document.createElement('a');
// 		  link.href = stripCanvas.toDataURL('image/png');
// 		  link.download = 'photo_strip.png';
// 		  link.click();
// 		}
// 	  };
// 	});
//   };

//   return (
// 	<div className='min-h-screen flex justify-center items-center bg-black px-4'>
// 	  <div className='flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl w-full mx-auto'>
// 		<div className='flex flex-col items-center text-center gap-6 w-full md:w-1/2'>
// 		  <TextGenerateEffect words={words} />

// 		  <div className='w-full h-[35vh] border-4 border-black rounded-2xl shadow-lg flex justify-center items-center bg-white relative'>
// 			{isCameraOn && (
// 			  <video
// 				ref={videoRef}
// 				autoPlay
// 				playsInline
// 				className='w-full h-full object-cover rounded-xl'
// 			  />
// 			)}
// 		  </div>

// 		  <div className='flex justify-center w-full gap-3'>
// 			<button
// 			  onClick={() => {
// 				startCamera();
// 				takePhotoSequence();
// 			  }}
// 			  className='w-auto h-full py-3 px-4 rounded-4xl border-2 border-black text-black bg-white'
// 			>
// 			  📸 Take Photo
// 			</button>
// 			<button
// 			  onClick={downloadPhotoStrip}
// 			  className='w-auto h-full py-3 px-4 rounded-4xl border-2 border-black text-black bg-white'
// 			>
// 			  📥 Download Photo Strip
// 			</button>
// 		  </div>
// 		</div>

// 		<div className='grid grid-cols-1 gap-4 w-full md:w-1/2 bg-blue-600'>
// 		  {Array(4)
// 			.fill(null)
// 			.map((_, index) => (
// 			  <div
// 				key={index}
// 				className='w-2/5 h-[15vh] border-3 border-black rounded-xl shadow-md flex justify-center items-center bg-white'
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
