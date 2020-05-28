class Dog {
  constructor() {
    this.url = 'https://cat-fact.herokuapp.com/facts';
    this.imageUrl = 'https://dog.ceo/api/breeds/image/random';
    this.fetchButton = document.querySelector('#fetch');
    this.showBlock = document.querySelector('#fact');
    this.loaderIcon = document.querySelector('.circle-loader__wrapper');
    this.image = document.querySelector('.main__image');
    this.output = [];
    this.window = window;
    this.events();
  }

  events() {
    this.fetchButton.addEventListener('click', () => this.getSingleQuote());
    this.window.addEventListener('load', this.getInformation(this.url));
  }

  // Methods

  // Get information from API
  getInformation(url) {

    fetch(url).then(res => res.json())
      .then(data => {
        const quotes = data.all.map(item => item.text);
        this.manipulateInformation(quotes);
      }).catch(err => console.log(err));
  }

  // Filter array and change cat words to dog words
  manipulateInformation(data) {
    let original = [
      'cat', 'kitten', 'kitty', 'kitties', 'Cat', 'Kitten', 'puppies', 'Puppies', 'meow', ' Meow', 'Mau', 'tom'
    ]
    let replacement = [
      'dog', 'puppy', 'puppy', 'puppies', 'Dog', 'Puppy', 'kitten', 'Kitten', 'bark', 'Bark', 'Saluki', 'dog'
    ]
    let originalReg = []

    for (let i = 0; i <= original.length; i++) {
      originalReg[i] = new RegExp(original[i], 'g');
    }

    let output = []

    data.forEach(element => {
      var result = '';
      for (let i = original.length - 1; i >= 0; i--) {
        var result = element.replace(originalReg[i], replacement[i]);
        element = result;
      }
      output.push(result);
    });
    this.output = output;
    this.getSingleQuote();
    this.hideLoaderIcon();
    return output;
  }

  // Get one modified quote from fetched data
  getSingleQuote() {
    let number = Math.floor(Math.random() * (this.output.length));
    let newText = '';
    if (this.output.length) {
      newText = this.output[number];
    } else {
      newText = 'No facts about the dogs at the moment';
    }

    this.showBlock.style.opacity = 0;
    setTimeout(() => {
      this.showBlock.innerHTML = newText;
      this.showBlock.style.opacity = 1;
    }, 500)

    this.getImage();
  }

  // Get random image from Dog API
  getImage(url) {
    this.showLoaderIcon();
    url = this.imageUrl;
    fetch(url).then(res => res.json())
      .then(data => {
        const imageSrc = data.message;
        this.image.style.backgroundImage = `url(${imageSrc})`;
        setTimeout(() => {
          this.hideLoaderIcon();
        }, 500);


      }).catch(err => console.log(err));
  }

  // Show loader icon
  showLoaderIcon() {
    this.loaderIcon.classList.add('circle-loader__wrapper--visible');
  }

  hideLoaderIcon() {
    this.loaderIcon.classList.remove('circle-loader__wrapper--visible');
  }
}

export default Dog