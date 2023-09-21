(function () {
    const audio = new Audio("YireiShamayimCrop.mp3");
    audio.loop = true;
    window.addEventListener("click", () => {
        document.body.classList.add("loaded");
        audio.play()
    });
    window.addEventListener("click", () => {
        document.body.classList.remove("loaded");
        audio.play()
    });
    window.addEventListener('click', first);

    function first() {
        document.body.classList.add("loaded");
        audio.play()
        document.addEventListener('click', second);
    }
    function second() {
        document.body.classList.clearWindow("loaded");
        document.addEventListener('click', third);
    }
    function third() {
        document.body.classList.add("loaded");
    }
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;

    let confetti = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        { front: 'pink', back: 'darkpink' },
        { front: '#fc89ac', back: '#ff0040' },
        { front: 'white', back: 'ivory' },
        { front: '#ffe4e1', back: '#ffb6c1' },
        { front: 'darkpink', back: '#fc6c85' },
        { front: 'darkpink', back: '#daa520' },
    ]

    //-----------Functions--------------
    resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cx = ctx.canvas.width / 2;
        cy = ctx.canvas.height / 2;
    };

    randomRange = (min, max) => Math.random() * (max - min) + min;

    initConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                color: colors[Math.floor(randomRange(0, colors.length))],
                dimensions: {
                    x: randomRange(10, 20),
                    y: randomRange(10, 30)
                },

                position: {
                    x: randomRange(0, canvas.width),
                    y: canvas.height - 1
                },

                rotation: randomRange(0, 2 * Math.PI),
                scale: {
                    x: 1,
                    y: 1
                },

                velocity: {
                    x: randomRange(-25, 25),
                    y: randomRange(0, -50)
                }
            });


        }
    };

    //---------Render-----------
    render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((confetto, index) => {
            let width = confetto.dimensions.x * confetto.scale.x;
            let height = confetto.dimensions.y * confetto.scale.y;

            // Move canvas to position and rotate
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);

            // Apply forces to velocity
            confetto.velocity.x -= confetto.velocity.x * drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

            // Set position
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;

            // Delete confetti when out of frame
            if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

            // Loop confetto x position
            if (confetto.position.x > canvas.width) confetto.position.x = 0;
            if (confetto.position.x < 0) confetto.position.x = canvas.width;

            // Spin confetto by scaling y
            confetto.scale.y = Math.cos(confetto.position.y * 0.1);
            ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

            // Draw confetti
            ctx.fillRect(-width / 2, -height / 2, width, height);

            // Reset transform matrix
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        });

        window.requestAnimationFrame(render);
    };
    //---------Execution--------

    render();

    //----------Resize----------
    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    //------------Click------------
    window.addEventListener("click", () => {
        document.body.classList.add("loaded");
        setTimeout(function () {
            initConfetti();
        }, 4500);
        audio.play()
    });
    // window.addEventListener('click', function () {
    //     initConfetti();
    //     audio.play();
    // });
    function unfade(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }
}());