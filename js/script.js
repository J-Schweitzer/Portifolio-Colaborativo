document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');
    const nextVideoArrow = document.getElementById('nextVideoArrow');
    let currentVideoIndex = 0;
    const players = []; // This array will store our YouTube Player objects

    // 1. Load the YouTube IFrame Player API asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 2. This function will be called by the YouTube API once it's ready
    window.onYouTubeIframeAPIReady = function() {
        videoItems.forEach((item, index) => {
            const iframe = item.querySelector('iframe');
            if (iframe) {
                // Extract the video ID from the iframe's src
                // Example src: https://www.youtube.com/embed/VIDEO_ID?
                const videoIdMatch = iframe.src.match(/\/embed\/([a-zA-Z0-9_-]+)/);
                let videoId = null;
                if (videoIdMatch && videoIdMatch[1]) {
                    videoId = videoIdMatch[1];
                } else {
                    // Fallback for placeholder URLs or if video ID isn't in /embed/ format
                    const params = new URLSearchParams(new URL(iframe.src).search);
                    videoId = params.get('v');
                }
                
                // If a valid videoId is found, create a new YT.Player
                if (videoId) {
                    players[index] = new YT.Player(iframe, {
                        videoId: videoId, // Use the extracted video ID
                        events: {
                            'onReady': (event) => {
                                // Hide all videos except the first one initially
                                if (index !== currentVideoIndex) {
                                    item.classList.add('hidden-video');
                                }
                                // You can optionally play the first video here, but let's keep it paused on load
                                // if (index === currentVideoIndex) {
                                //     event.target.playVideo();
                                // }
                            }
                        }
                    });
                } else {
                    console.warn(`Could not extract video ID for iframe at index ${index}. Ensure src is correct.`);
                    // Still hide if not the current one, even if player couldn't be created
                    if (index !== currentVideoIndex) {
                        item.classList.add('hidden-video');
                    }
                }
            } else {
                // If there's no iframe, just hide the item if it's not the first
                if (index !== currentVideoIndex) {
                    item.classList.add('hidden-video');
                }
            }
        });

        // Event listener for the next arrow
        if (nextVideoArrow) {
            nextVideoArrow.addEventListener('click', () => {
                // 1. Pause the currently playing video
                if (players[currentVideoIndex] && typeof players[currentVideoIndex].pauseVideo === 'function') {
                    players[currentVideoIndex].pauseVideo();
                }

                // 2. Hide the current video item
                videoItems[currentVideoIndex].classList.add('hidden-video');

                // 3. Move to the next video
                currentVideoIndex = (currentVideoIndex + 1) % videoItems.length;

                // 4. Show the next video item
                videoItems[currentVideoIndex].classList.remove('hidden-video');

                // 5. Optional: Play the next video automatically
                // This line is often desired with a video slider
                if (players[currentVideoIndex] && typeof players[currentVideoIndex].playVideo === 'function') {
                     players[currentVideoIndex].playVideo();
                }

                // Optional: Hide arrow if it's the last video and you don't want to loop
                // if (currentVideoIndex === videoItems.length - 1 && videoItems.length > 1) {
                //     nextVideoArrow.classList.add('hidden');
                // } else {
                //     nextVideoArrow.classList.remove('hidden');
                // }
            });
        }
    };
});