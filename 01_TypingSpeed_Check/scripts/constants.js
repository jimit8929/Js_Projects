const WpmTile = document.querySelector('[data-tile="wpm"]');
const accuracyTile = document.querySelector('[data-tile="accuracy"]');
const TimeTile = document.querySelector('[data-tile="time"]');


const textAreaInput = document.querySelector(".text-area__input");
const textAreaText = document.querySelector(".text-area__text");


const resetbutton = document.querySelector(".reset");


const keys = document.querySelectorAll(".key");


const word = document.querySelector("#word-template").content;


const ValidInputKeys = "ABCEDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[];,./'";


const ignoredKeys = ["Shift" ,"Capslock"];


const punctuationOrSpace = ",.;";


const paragraphs = [

    `Polar bears are big, white bears that live in the cold parts of the world, like the North Pole.`,
    `Internal peace is the feeling of being calm and content inside yourself, even when things around you are chaotic. It's like having a quiet place within your mind where you can go to find tranquility and solace.`,
    `Limitlessness is the idea of having no boundaries or restrictions. It's like having endless possibilities and opportunities ahead of you. When you feel limitless, you're free to dream big and chase after your goals without fear of hitting a wall.`,
    `Synchronicity is when things happen in a way that seems connected but maybe aren't supposed to be. It's like when you're thinking about someone, and then they call you out of the blue.`,
    `When you are in the flow state, everything feels just right. It's like being in a groove where everything clicks smoothly. Your mind is clear, and you're focused completely on what you're doing.`,
    `The top eateries aren't just places where you eat food. They're special spots that make you feel good and remember the food for a long time.`,
    `The big water that covers most of our world is called the ocean. It is very big and very deep, with many different kinds of animals and plants living inside it.`,
    `ChatGPT is a clever computer program that talks with people like me. It knows a lot of things and can help with questions or just have a chat.`,
    `Dogs are furry friends that many people love. They come in different shapes and sizes, from tiny ones that fit in your hand to big ones that can pull sleds.`, 
    `Sunsets are when the sky changes colors at the end of the day. The sun goes down, and everything turns shades of orange, pink, and purple.`,
    `Mountains are tall landforms that rise high above the ground. They are made of rock and can have snow on top if they are really high.`,
    `Kindness is when you do something nice for someone else, like helping or saying a kind word. It makes both people feel good.`,
    `Rain is water that falls from clouds in the sky. Sometimes it's light and soft, and sometimes it's heavy and loud.`,
    `A library is a quiet place where you can read books, learn new things, and even borrow stories to take home.`,
    `Sleep is when your body and brain take a break to rest. It's important because it helps you grow, heal, and feel fresh in the morning.`,
    `Music is sound made in a way that people like to listen to. It can be fast or slow, happy or sad, and makes you feel different things.`,
    `The moon is a big ball of rock that goes around Earth. At night, it glows in the sky and has different shapes, like a circle or a crescent.`,
    `A forest is a big area filled with trees, plants, and animals. It's green, quiet, and full of nature sounds like birds and rustling leaves.`
]


const getRandomParagraph = () => {
  // Add null checks and proper splitting
  if (!paragraphs || paragraphs.length === 0) {
    console.error("No paragraphs available!");
    return [];
  }
  
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  const selected = paragraphs[randomIndex];
  
  // Split into words with proper space handling
  return selected.split(" ").filter(word => word.trim() !== "");
}


export{
    WpmTile,
    accuracyTile,
    TimeTile,
    textAreaInput,
    textAreaText,
    getRandomParagraph,
    ValidInputKeys,
    resetbutton,
    paragraphs,
    ignoredKeys,
    keys,
    punctuationOrSpace,
    word,
};