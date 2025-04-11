document.addEventListener("DOMContentLoaded", () => {
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    
    if (!isMobile) {
        const carouselInner = document.querySelector(".carousel-inner");
        const magnifier = document.createElement("div");
        magnifier.classList.add("magnifier");
        carouselInner.appendChild(magnifier);

        const zoomFactor = 1

        carouselInner.addEventListener("mousemove", (e) => {
            const activeImage = carouselInner.querySelector(".carousel-item.active img");
            if (!activeImage) return;

            const rect = activeImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const magnifierSize = magnifier.offsetWidth / 2;

            magnifier.style.display = "block";
            magnifier.style.left = `${x - magnifierSize}px`;
            magnifier.style.top = `${y - magnifierSize}px`;

            magnifier.style.backgroundImage = `url('${activeImage.src}')`;
            magnifier.style.backgroundRepeat = "no-repeat";


            magnifier.style.backgroundSize = `${activeImage.naturalWidth * zoomFactor}px ${activeImage.naturalHeight * zoomFactor}px`;

            const bgX = -(x * (activeImage.naturalWidth / rect.width) * zoomFactor - magnifierSize);
            const bgY = -(y * (activeImage.naturalHeight / rect.height) * zoomFactor - magnifierSize);

            magnifier.style.backgroundPosition = `${bgX}px ${bgY}px`;
        });

        carouselInner.addEventListener("mouseleave", () => {
            magnifier.style.display = "none";
        });
    }
});