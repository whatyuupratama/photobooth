import { useRef, useState } from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Head from 'next/head';
// import Image from
const words = 'Safira Private PhotoBooth 👋🏻';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countTime, setCountTime] = useState<number | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  const startCamera = () => {
    setIsCameraOn(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error('Error accessing camera: ', error));
  };

  const takePhotoSequence = () => {
    let shots = 4;
    let count = 3;
    setCountTime(count);

    const interval = setInterval(() => {
      if (count > 0) {
        setCountTime(count - 1);
        count -= 1;
      }

      if (count === 0) {
        captureImage();
        shots -= 1;
        count = 3;
      }

      if (shots === 0) {
        clearInterval(interval);
        setCountTime(null);
      }
    }, 1000);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL('image/png');

        setPhotos((prevPhotos) => {
          if (prevPhotos.length >= 4) {
            return [...prevPhotos.slice(1), imageData];
          }
          return [...prevPhotos, imageData];
        });
      }
    }
  };
  const downloadPhotoStrip = () => {
    if (photos.length === 0) return;

    const imgWidth = 250; // Lebar gambar tetap
    const imgHeight = 180; // Tinggi gambar tetap
    const gap = 20; // Jarak antar gambar
    const framePadding = 40; // Padding bingkai

    // **Hitung ukuran frame agar sesuai dengan tampilan di website**
    const frameWidth = imgWidth + framePadding * 2;
    const frameHeight =
      photos.length * imgHeight + (photos.length - 1) * gap + framePadding * 2;

    const stripCanvas = document.createElement('canvas');
    const ctx = stripCanvas.getContext('2d');
    if (!ctx) return;

    stripCanvas.width = frameWidth;
    stripCanvas.height = frameHeight + 30; // Tambahan untuk teks di bawahnya

    // **Buat latar belakang putih**
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);

    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;

      img.onload = () => {
        const xPos = framePadding;
        const yPos = framePadding + index * (imgHeight + gap);

        // **Pastikan gambar tetap proporsional tanpa lonjong**
        ctx.drawImage(img, xPos, yPos, imgWidth, imgHeight);

        // Jika gambar terakhir sudah dimuat, tambahkan teks & unduh
        if (index === photos.length - 1) {
          const date = new Date();
          const dateString = date.toLocaleString('id-ID', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });

          ctx.fillStyle = '#000';
          ctx.font = '13px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            `Safira ${dateString}`,
            stripCanvas.width / 2,
            frameHeight + 20
          );

          // **Buat file gambar**
          const link = document.createElement('a');
          link.href = stripCanvas.toDataURL('image/png');
          link.download = 'photo_strip.png';
          link.click();
        }
      };
    });
  };

  return (
    <>
      <Head>
        <title>Safira Private PhotoBooth</title>
        <meta
          name='description'
          content='Aplikasi PhotoBooth pribadi dengan efek keren!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/remov.png' />
      </Head>
      <div className='min-h-screen flex justify-center items-center bg-black px-4 relative'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl w-full mx-auto'>
          <div className='flex flex-col items-center text-center gap-6 w-full md:w-1/2'>
            <TextGenerateEffect words={words} />

            <div className='w-full h-[35vh] border-4 border-white rounded-2xl shadow-lg flex justify-center items-center bg-white relative'>
              {isCameraOn && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className='w-full h-full object-cover rounded-xl'
                />
              )}
            </div>

            <div className='flex justify-center w-full gap-3 flex-wrap'>
              <button
                onClick={() => {
                  startCamera();
                  takePhotoSequence();
                }}
                className='w-full sm:w-auto h-full py-2 sm:py-3 px-3 sm:px-4 rounded-4xl border-2 border-black text-black bg-white'
              >
                📸 Take Photo
              </button>
              <button
                onClick={downloadPhotoStrip}
                className='w-full sm:w-auto h-full py-2 sm:py-3 px-3 sm:px-4 rounded-4xl border-2 border-black text-black bg-white'
              >
                📥 Download Photo Strip
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4 w-full md:w-56'>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className='w-full h-[14vh] sm:h-[16vh] border-3 border-white rounded-xl shadow-md flex justify-center items-center bg-white'
                >
                  {photos[index] ? (
                    <img
                      src={photos[index]}
                      alt={`Photo ${index + 1}`}
                      className='w-full h-full object-cover rounded-lg'
                    />
                  ) : (
                    <span className='text-black text-xs sm:text-base'>
                      Photo {index + 1}
                    </span>
                  )}
                </div>
              ))}
          </div>

          <canvas ref={canvasRef} className='hidden' />
          {countTime !== null && (
            <span className='text-black text-5xl sm:text-6xl font-bold pl-16 mt-6 sm:mt-10'>
              {countTime}
            </span>
          )}
        </div>

        {/* Gambar di pojok kanan bawah */}
        <div className='absolute bottom-4 right-4 justify-between hidden sm:block xl:block md:block xs:block'>
          <img src='/safir.png' className='w-[300px] h-[400px]' alt='Pes' />
        </div>
      </div>
    </>
  );
}
