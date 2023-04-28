Приложение для подписи сообщений и отправки сообщений на Next.js

## Архитектура приложения

- `pages/` - директория, содержащая страницы приложения.
- `components/` - директория, содержащая компоненты приложения.
- `public/` - директория, содержащая статические файлы, такие как изображения и CSS.
- `helpers/` - директория, содержащая вспомогательные функции.
- `services/` - директория, содержащая функции для работы со смарт контрактом.
- `storage/` - директория, содержащая функции по работе с local storage.
- `tests/` - директория, содержащая файлы тестов приложения.

## Использованные технологии

Приложение "Eth sign and send" использует следующие технологии:
- **Next.js** - фреймворк для рендеринга React на стороне сервера и статической генерации.
- **React** - библиотека для создания пользовательских интерфейсов.
- **Sass** - препроцессор CSS для более удобного написания стилей.
- **Ethers.js** - библиотека для работы с Ethereum блокчейном.
- **Wagmi** - библиотека для подключения к консенсусу PoS на блокчейне Ethereum.
- **Web3Modal** - библиотека для удобной работы с различными Ethereum кошельками.
- **Jest** - фреймворк для тестирования JavaScript-кода

## Инструкции по развертыванию и настройке

Для развертывания и настройки нашего приложения на **Next.js**, следуйте этим шагам:

1. Установите зависимости, выполнив команду `npm install`.
2. Создайте файл `.env` с необходимыми переменными окружения, включая URL вашего Ethereum провайдера.
3. Запустите приложение в режиме разработки, выполнив команду `npm run dev`.
4. Перейдите на страницу `http://localhost:3000` в вашем браузере, чтобы увидеть работу приложения.

Для тестирования компонентов приложения выполните команду `npm test`.

## Deploy on Vercel

Проект опубликован на Vercel - https://ethers-sign-and-send-message-pdex-efxsegvpq-m00n41ld.vercel.app/

## Описание функциональности приложения

1. **_app.js** - Этот файл является входным для рендера страницы на Next.js и содержит хуки и компонент `Web3Modal` для работы с Ethereum кошельком. Также в файле используется `Wagmi` клиент, который оборачивает все наше приложение и предоставляет состояние подключения к кошельку.


2. **index.js** - Этот файл отвечает за рендеринг главной страницы, которая включает в себя компоненты, такие как мета-данные, заголовок, подвал и контентную часть. Компонент `Connector` позволяет пользователю подключить свой кошелек к приложению и показывает, подключен ли он уже. Функции `useAccount` и `useSigner` используются для работы с информацией об аккаунте.


3. **HomeContent.js** - Это компонент на главной странице, который импортирует две формы - `SignForm` и `VerifyForm`, используя контекст SignContext. В компоненте есть два состояния - `signInfo` и `localIsConnected`, которые устанавливаются через хуки **useState**. При изменении `isConnected`, мы также обновляем `localIsConnected`. Если `localIsConnected` равен `true`, мы рендерим две формы в контексте `SignContext`.


4. **SignForm.js** - отвечает за создание подписи для сообщения. В компоненте используются следующие хуки:

    - **useState**: для установки состояний `notify`, `isNotifyVisible` и `disabled`;
    - **useRef**: для получения ссылки на элемент `input`, содержащий сообщение;
    - **useContext**: для получения и установки контекста `SignContext`;
    - **useEffect**: для обработки изменений состояний `notify` и `isNotifyVisible`.

    Переменная `notify` используется для вывода сообщений об ошибках и успешном создании подписи. Состояние `isNotifyVisible` управляет видимостью сообщений. Состояние `disabled` устанавливается на `true` в начале `handleSign`, чтобы предотвратить повторную отправку формы до завершения предыдущей отправки.

    Обработчик `handleSign` вызывается при отправке формы и создает подпись для введенного пользователем сообщения, используя функцию `sign` из файла **sign.js**. Если подпись была успешно создана, компонент также обновляет контекст, используя функцию `setSignInfo`. Если произошла ошибка, компонент отображает сообщение об ошибке, используя функцию `setNotify`, и обновляет состояния `isNotifyVisible` и `disabled`. Компонент также включает дочерний компонент `Message`, который отображает сообщения об ошибках и успешном создании подписи.


5. **sign.js** - Эту функцию мы вызываем в компоненте SignForm.js для того, чтобы при помощи библиотеки Ethers вызывать попап кошелька и осуществить подпись. Функция `sign` принимает объект с параметрами `message`, `setNotify`, `setIsNotifyVisible`, и `signer`. Переменная `message` содержит сообщение, которое необходимо подписать. `setNotify` и `setIsNotifyVisible` используются для управления отображением уведомления о результате подписи, а `signer` - это объект, представляющий подписчика. Функция возвращает объект с полями `message`, `address`, и `signature`.


6. **VerifyForm** - Компонент `VerifyForm` отвечает за верификацию сообщений, адресов и подписей. В компоненте используются следующие хуки:

   - **useState**: для установки состояний `verified`, `notify`, `isNotifyVisible` и `disabled`;
   - **useContext**: для получения и установки контекста `SignContext`;
   - **useEffect**: для обработки изменений состояний `contextObj` и `verified`.

Переменная `verified` устанавливается в `false` по умолчанию и изменяется на `true` в `handleVerify`, если сообщение, адрес и подпись верифицированы успешно. Переменная `notify` используется для вывода сообщений об ошибках в процессе верификации. Состояние `disabled` устанавливается на `true` в начале `handleVerify`, чтобы предотвратить повторный запрос на верификацию до завершения предыдущего запроса.

Также в компоненте есть обработчик `handleMessage`, который обновляет контекст при изменении вводимых пользователем данных. Компонент также включает дочерний компонент `SendForm`, который отвечает за отправку сообщения.


7. **verify.js** - Функция `verify` в модуле **verify.js** предназначена для верификации сообщения, подписи и адреса. Она принимает следующие аргументы:

   --- `message` - строка сообщения, которое нужно верифицировать.
   --- `address` - строка, представляющая адрес отправителя сообщения.
   --- `signature` - строка, представляющая подпись сообщения.
   --- `setNotify` - функция, которая устанавливает сообщение об ошибке или успехе при верификации.

Функция использует библиотеку **ethers** для проверки подписи и возвращает `true`, если сообщение, подпись и адрес соответствуют друг другу. Если сообщение не удалось верифицировать, функция возвращает false и устанавливает сообщение об ошибке в `setNotify`. Если произошла какая-то другая ошибка при верификации, функция также возвращает `false` и устанавливает сообщение об ошибке.

8. **SignForm.js** - Компонент `SignForm` отвечает за подпись сообщений. В компоненте используются следующие хуки:

- **useState**: для установки состояний `notify`, `isNotifyVisible` и `disabled`;
- **useRef**: для получения доступа к значению поля ввода сообщения;
- **useContext**: для получения и установки контекста `SignContext`.

Обработчик `handleSign` вызывается при отправке формы и включает в себя логику подписи сообщения. Если подпись выполнена успешно, то устанавливается контекст подписи и выводится сообщение об успешном завершении. Если при подписи произошла ошибка, то выводится сообщение об ошибке - за эту логику отвечает компонент `Message`.

Состояние `isNotifyVisible` управляет видимостью сообщения. Состояние `disabled` устанавливается на `true` в начале `handleSign`, чтобы предотвратить повторную отправку формы до завершения предыдущей отправки.


9. **sendToContract.js** - функция принимает четыре аргумента: `form`, `setPrize`, `setNotify` и `signer`.

--- form содержит данные формы, которую пользователь заполняет, включая message (сообщение) и signature (подпись).

--- setPrize и setNotify - это функции установки состояния для обновления компонента в соответствии с результатами действия.

---signer - это объект, который представляет аккаунт Ethereum, который будет использоваться для отправки транзакций на смарт-контракт.

Внутри функции, создается объект contract с помощью ethers.Contract, который представляет смарт-контракт с указанным адресом и ABI.
Затем создается асинхронная функция result, которая проверяет подлинность сообщения и подписи с помощью метода verify контракта.
Если подлинность сообщения и подписи подтверждается, то вызывается метод getPrize контракта, который возвращает приз.

Приз сохраняется в локальном хранилище с помощью функции savePrizeToLocalStorage, которая также обновляет уведомление через setNotify.
Наконец, функция возвращает true в случае успеха. Если что-то идет не так, возвращается false и выводится сообщение об ошибке через setNotify.

10. **PrizesForm.js** - компонент предназначен для отображения списка призов, которые пользователь получил за отправку сообщений в контракт. Компонент получает два пропса: address - адрес кошелька пользователя на Ethereum, и isConnected - флаг, указывающий, подключен ли пользователь к сети Ethereum.

Компонент использует хук useState для хранения массива призов, и хук useEffect для загрузки списка призов из локального хранилища при изменении address. Также используется useEffect для установки локального состояния localIsConnected в соответствии со значением isConnected.

Если isConnected равно true, компонент отображает список призов в компоненте PrizesList. Если список призов пустой, отображается соответствующее сообщение. Если isConnected равно false, ничего не отображается.
