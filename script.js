document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-effect');
    const wordsToType = ["Test Your Speed", "Improve Your Accuracy", "Become a Pro Typist"];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        // Get the current word
        const currentWord = wordsToType[wordIndex];
        
        // If deleting, remove a character. If not, add one.
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine the speed of typing/deleting
        let typeSpeed = isDeleting ? 100 : 200;

        // If word is fully typed
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeleting = true;
        } 
        // If word is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToType.length; // Move to the next word
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing effect
    type();

    // Add functionality to the start button (for now, just an alert)
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
         window.location.href = 'homeActivity.html';
        // You will later replace this with code to navigate to the test page.
    });
});