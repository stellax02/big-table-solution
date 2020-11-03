export default class Audio {


    constructor(targetElement) {

        this.targetElement = targetElement;
        // Defining target data attributes

        this.baseElementAttr = '[data-' + 'audio';                              // [data-audio
        this.audioPlayerAttr = this.baseElementAttr + '="player"]';             // [data-audio="player"]
        this.playBtnAttr = this.baseElementAttr + '="navPlay"]';                // [data-audio="navPlay"]
        this.rewindBtnAttr = this.baseElementAttr + '="navRewind"]';            // [data-audio="navRewind"]
        this.muteBtnAttr = this.baseElementAttr + '="navMute"]';                // [data-audio="navMute"]
        this.audioSrcAttr = this.baseElementAttr + '="audioSource"]';            // [data-audio="audioSource"]
        
        this.volumeRangeAttr = this.baseElementAttr + '="volumeRange"]';        // [data-audio="volumeRange"]
        this.volumeProgressAttr = this.baseElementAttr + '="volumeProgress"]';  // [data-audio="volumeProgress"]
        this.volumeThumbAttr = this.baseElementAttr + '="volumeThumb"]';        // [data-audio="volumeThumb"]

        this.seekRangeAttr = this.baseElementAttr + '="navSeekRange"]';         // [data-audio="navSeekRange"]
        this.seekProgressAttr = this.baseElementAttr + '="navSeekProgress"]';        // [data-audio="navSeekProgress"]
        this.seekThumbAttr = this.baseElementAttr + '="navSeekThumb"]';         // [data-audio="navSeekThumb"]

        this.volumeBarAttr = this.baseElementAttr + '="navVolume"]';            // [data-audio="navVolume"]
        this.rangeTimerAttr = this.baseElementAttr + '="navTimer"]';            // [data-audio="navTimer"]

    }

    initialize() {
        const targetElementClass = this.targetElementClass;

        // Global button data attributes
        const audioPlayerAttr = this.audioPlayerAttr;
        const playBtnAttr = this.playBtnAttr;
        const rewindBtnAttr = this.rewindBtnAttr;
        const muteBtnAttr = this.muteBtnAttr;

        // Source attributes
        const audioSrcAttr = this.audioSrcAttr;

        // Volume element data attributes
        const volumeRangeAttr = this.volumeRangeAttr;
        const volumeProgressAttr = this.volumeProgressAttr;
        const volumeThumbAttr = this.volumeThumbAttr;

        // Seekbar element data attributes
        const seekRangeAttr = this.seekRangeAttr;
        const seekProgressAttr = this.seekProgressAttr;
        const seekThumbAttr = this.seekThumbAttr;

        // Standalone element data attributes
        const volumeBarAttr = this.volumeBarAttr;
        const rangeTimerAttr = this.rangeTimerAttr;



        let targetElement = this.targetElement;
            
            // Global button DOM elements
            this.audioPlayer = targetElement.querySelector(audioPlayerAttr);
            this.playButton = targetElement.querySelector(playBtnAttr);
            this.rewindButton = targetElement.querySelector(rewindBtnAttr);
            this.muteButton = targetElement.querySelector(muteBtnAttr);
            this.audioSource = targetElement.querySelector(audioSrcAttr);


            // Volume DOM elements
            let volumeRange = targetElement.querySelector(volumeRangeAttr);
            let volumeProgress = targetElement.querySelector(volumeProgressAttr);
            let volumeThumb = targetElement.querySelector(volumeThumbAttr);
            //let volumeBar = targetElement.querySelector(volumeBarAttr);

            // Seekbar DOM elements
            let seekRange = targetElement.querySelector(seekRangeAttr);
            let seekProgress = targetElement.querySelector(seekProgressAttr);
            let seekThumb = targetElement.querySelector(seekThumbAttr);

            let rangeTimer = targetElement.querySelector(rangeTimerAttr);
            

            /* Audio player initial values */

            
            // Initial setup for audio native volume value
            this.audioPlayer.volume = 0.3;

            // Volume
            let volumeProgressValue = 0;
            let volumeValue = this.audioPlayer.volume;
            let volumeRangeSize = volumeRange.offsetWidth;
            let volumeThumbValue = volumeValue * 100;
           
            // Apply volume values to volume thumb element
            this.updateVolumeThumb(volumeThumb, volumeThumbValue);
            // Apply volume values to volume progress element 
            this.updateVolumeProgress(volumeProgress, this.audioPlayer.volume);
            
            

            // SeekBar
            let seekProgressValue = this.audioPlayer.currentTime;
            let seekThumbValue = 0;
            let seekRangeValue = 0;
            let timeValue = 0;
            let seekRangeSize = seekRange.offsetWidth;

            

            //Initial setup for range timer
            rangeTimer.innerHTML = "00:00";

            // Add event listener for play and pause audio button
            this.playButton.addEventListener('click', () => {
                this.audioPlayer.paused ? this.playAudio() : this.pauseAudio();
            });

            // Add event listener for rewind audio to start button
            this.rewindButton.addEventListener('click', () => {
                this.rewindAudio();
            });

            // Add event listener for mute audio button
            this.muteButton.addEventListener('click', () => {
                this.toggleMute();
                // NOTE: On mute status change also triggers volumechange event on audio 
            });

             // Event listener for the audio volume bar
             volumeRange.addEventListener("click", (event) => {

                volumeRangeSize = volumeRange.offsetWidth;
                let volumeRangeClickPos = event.offsetX;

                // Calculate the new time
                volumeValue = volumeRangeClickPos / volumeRangeSize;
                
                // Call function to update the audio time 
                this.updateVolume(volumeValue);
            });


            // Add event listener when the volumeThumb is pressed
            volumeThumb.addEventListener('mousedown', (event) => {

                volumeRangeSize = volumeRange.offsetWidth;

                // Prevent HTML native drag behavior of elements
                event.preventDefault();

                // thumb position at the start of event
                let thumbPos = volumeRangeSize * this.audioPlayer.volume;
                // mouse arrow position at the start of event
                let initX = event.clientX;

                // variable to store the event in, because we want to remove event listener after we stop dragging the thumb
                let dragMouseEvent = null;


                // Add a sub event listener for moving the mouse after mousedown event is called, store the event in dragMouse event variable
                document.addEventListener('mousemove', dragMouseEvent = function (event) {
                    dragMouse(event);
                });

                // Add a sub event listener to on the volumeThumb element to remove the mousemove event listener on mouse up (drag stop)
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', dragMouseEvent);
                    dragMouseEvent = null;
                });

                // Drag method and calculation
                let dragMouse = (event) => {

                   
                    // Calculation for mouse move
                    let moveX = event.clientX - initX;

                    // calculation for new thumb position which is initial thumb position + mouse moved on x axis
                    let newX = thumbPos + moveX;


                    // Bind the thumb position inside the range, so it cannot go over max or min values
                    if (newX < 0) {
                        newX = 0;
                    }
                    else if (newX > volumeRangeSize) {
                        newX = volumeRangeSize;
                    }

                    // Apply the new transform on the thumb values in css                  
                    this.updateVolumeThumb(volumeThumb, volumeThumbValue);

                    // Calculate the volume progress value so it can update at the same time as the thumb element
                    volumeProgressValue = 100 / volumeRangeSize * newX / 100;
                    
                    // Call update volume action method
                    this.updateVolume(volumeProgressValue);
                }



            });

            // Event listener for the audio volume bar
            this.audioPlayer.addEventListener("volumechange", () => {

                volumeThumbValue = this.audioPlayer.volume * 100;

                if(this.audioPlayer.muted){
                    // Call function to update the audio time 
                    this.updateVolumeThumb(volumeThumb, 0);
                    // Call function to update the audio time 
                    this.updateVolumeProgress(volumeProgress, 0);
                 
                }
                else{
                    // Call function to update the audio time 
                    this.updateVolumeThumb(volumeThumb, volumeThumbValue);
                    // Call function to update the audio time 
                    this.updateVolumeProgress(volumeProgress, this.audioPlayer.volume);
                 
                } 
                
                
            });

            // Event listener for the seek bar
            seekRange.addEventListener("click", (event) => {
                seekRangeSize = seekRange.offsetWidth;
                let seekRangeClickPos = event.offsetX;

                seekRangeValue = 100 / seekRangeSize * seekRangeClickPos / 100;

 
                // Calculate the new time
                timeValue = this.audioPlayer.duration * (seekRangeValue / 100) * 100;

                // Call function to update the audio time 
                this.updateAudioTime(timeValue);
                
            });

            // Event listener to update the seek bar as the video plays
            this.audioPlayer.addEventListener("timeupdate", () => {

                // Calculate the slider value
                seekProgressValue = this.audioPlayer.currentTime / this.audioPlayer.duration;
                seekThumbValue = 100 * seekProgressValue;

                // Update the slider value
                this.updateSeekProgress(seekProgress, seekProgressValue);
                this.updateSeekThumb(seekThumb, seekThumbValue);
                this.updateTimer(rangeTimer, this.audioPlayer.currentTime);

                if (seekProgressValue == 1)
                    this.pauseAudio(playButton);
            });

            // Add event listener when the seekThumb is pressed
            seekThumb.addEventListener('mousedown', (event) => {

                seekRangeSize = seekRange.offsetWidth;

                // Prevent HTML native drag behavior of elements
                event.preventDefault();

                // thumb position at the start of event
                let thumbPos = this.audioPlayer.currentTime / this.audioPlayer.duration * seekRangeSize;
                
                // mouse arrow position at the start of event
                let initX = event.clientX;

                // variable to store the event in, because we want to remove event listener after we stop dragging the thumb
                let dragMouseEvent = null;
                

                // Add a sub event listener for moving the mouse after mousedown event is called, store the event in dragMouse event variable
               document.addEventListener('mousemove', dragMouseEvent = function (event) {
                    dragMouse(event);
                });

                // Add a sub event listener to on the seekThumb element to remove the mousemove event listener on mouse up (drag stop)
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', dragMouseEvent);
                    dragMouseEvent = null;
                });

                // Drag method and calculation
                let dragMouse = (event) => {

                    // Calculation for mouse move
                    let moveX = event.clientX - initX;
                    
                    // calculation for new thumb position which is initial thumb position + mouse moved on x axis
                    let newX = thumbPos + moveX;

              
                    // Bind the thumb position inside the range, so it cannot go over max or min values
                    if (newX < 0) {
                        newX = 0;
                    }
                    else if (newX > seekRangeSize) {
                        newX = seekRangeSize;
                    }

                    seekThumbValue = newX / seekRangeSize * 100;
                    // Apply the new transform on the thumb values in css
                    this.updateSeekThumb(seekThumb, seekThumbValue);
                    // Calculate the time value so it can update at the same time as the thumb element
                    seekRangeValue = 100 / seekRangeSize * newX / 100;
                    timeValue = this.audioPlayer.duration * (seekRangeValue / 100) * 100;
                   
                    // Call update time action method
                    this.updateAudioTime(timeValue);
                }

            });

    }


    // Action calls

    // Play audio
    playAudio() {
        this.playButton.classList.add('play'); 
        this.audioPlayer.play();
    }

    // Pause audio
    pauseAudio() {
        this.playButton.classList.remove('play');
        this.audioPlayer.pause();
    }

    // Rewind audio
    rewindAudio() {
        this.audioPlayer.currentTime = 0;
    }

    // Change source action

    changeSource(audioSource){
        this.pauseAudio();
        this.rewindAudio();
        this.audioSource.src = audioSource;
        this.audioPlayer.load();
    }

    // Toggle audio mute status
    toggleMute(){
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.muteButton.classList.toggle('muted');
    }

    // Update Volume
    updateVolume(volumeValue) {
        this.audioPlayer.volume = volumeValue;
    }

     // Update Volume Thumb position
     updateVolumeThumb(volumeThumb, volumeThumbValue) {
        volumeThumb.style.left = volumeThumbValue + "%";
    }

    // Update Volume Thumb position
    updateVolumeProgress(volumeProgress, volumeProgressValue) {
        volumeProgress.style.transform = "scaleX(" + volumeProgressValue + ")";
    }

    // Update time value of the audio player
    updateAudioTime(time) {
        this.audioPlayer.currentTime = time;
    }

    // Update position and value of the seek bar
    updateSeekProgress(seekProgress, seekProgressValue) {
        seekProgress.style.transform = "scaleX(" + seekProgressValue + ")";
    }

    // Update position and value of the seek bar
    updateSeekThumb(seekThumb, seekThumbValue) {
        seekThumb.style.left =  seekThumbValue + "%";
    }

     // Update timer value 
    updateTimer(rangeTimer, timeValue) {

        // First we calculate time with a helper method that returns a string e.g. "00:02"
        let viewTimeValue = this.calculateTime(timeValue);
        rangeTimer.innerHTML = viewTimeValue;
    }

    // Helper actions

    calculateTime(timeValue) {
        timeValue = Number(timeValue);
        let h = Math.floor(timeValue / 3600);
        let m = Math.floor(timeValue % 3600 / 60);
        let s = Math.floor(timeValue % 3600 % 60);

        let hDisplay = h > 0 ? (h < 10 ? "0" + h + ":" : h + ":") : "00:";
        let mDisplay = m > 0 ? (m < 10 ? "0" + m + ":" : m + ":") : "00:";
        let sDisplay = s > 0 ? (s < 10 ? "0" + s : s) : "00";
        return hDisplay > 0 ? hDisplay + mDisplay + sDisplay : mDisplay + sDisplay;
    }
} 