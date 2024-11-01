import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva';
import useImage from 'use-image';

const ImageCanvas = ({ file }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [hoveredBlock, setHoveredBlock] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null); // Состояние для выбранного блока
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const stageRef = useRef(null);

    useEffect(() => {
        if (file) {
            const handleImageUpload = async () => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('http://127.0.0.1:5000/process_image', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setBlocks(data.blocks);

                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    // Устанавливаем исходные размеры изображения
                    setImageDimensions({ width: img.width, height: img.height });
                    setImageSrc(img.src);
                };
            };

            handleImageUpload();
        }
    }, [file]);

    const [image] = useImage(imageSrc);

    const handleBlockClick = (block) => {
        // Сохраняем координаты выбранного блока в состояние
        setSelectedBlock(block.coordinates);
        console.log("Selected block coordinates:", block.coordinates); // Выводим координаты в консоль
    };

    return (
        <div
            style={{
                maxWidth: '1000px',
                maxHeight: '800px',
                overflow: 'auto',
                border: '1px solid red',
                position: 'relative',
            }}
        >
            <Stage
                width={imageDimensions.width} // Используем исходные размеры изображения
                height={imageDimensions.height}
                ref={stageRef}
            >
                <Layer>
                    {/* Изображение */}
                    {image && (
                        <KonvaImage
                            image={image}
                            x={0}
                            y={0}
                            width={imageDimensions.width}
                            height={imageDimensions.height}
                        />
                    )}

                    {/* Блоки */}
                    {blocks.map((block, index) => {
                        const [x1, y1, x2, y2] = block.coordinates;
                        const isHovered = hoveredBlock === index;
                        return (
                            <Rect
                                key={index}
                                x={x1}
                                y={y1}
                                width={x2 - x1}
                                height={y2 - y1}
                                stroke={isHovered ? 'blue' : 'red'}
                                strokeWidth={1}
                                onMouseEnter={() => setHoveredBlock(index)}
                                onMouseLeave={() => setHoveredBlock(null)}
                                onClick={() => handleBlockClick(block)} // Сохраняем координаты при клике
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

export default ImageCanvas;
