import '../styles/styles.css';
import Dog from './modules/Dog'

new Dog();

if (module.hot) {
    module.hot.accept();
}