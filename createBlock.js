'use strict'

// Требует node.js и пакета mkdirp
// Пакет mkdirp: https://www.npmjs.com/package/mkdirp#install — установить глобально или прописать установку в package.json, в секции devDependencies
// Использование:
//   - поместить этот файл в корень проекта
//   - исправить пути к генерируемым папкам и файлам, если блоки проекта лежат не в ./src/blocks/
//   - в терминале, будучи в корневой папке проекта, выполнить node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs')                // будем работать с файловой системой
const mkdirp = require('mkdirp')        // зависимость, должна быть установлена (см. описание выше)

const styleFile = 'src/scss/style.scss'
const mixinsFile = 'src/pug/mixins.pug'

const blockName = process.argv[2]          // получим имя блока
const defaultExtensions = ['pug', 'scss'] // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)))  // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if (blockName) {

	let dirPath = 'src/blocks/' + blockName + '/' // полный путь к создаваемой папке блока
	fs.mkdir(dirPath, {recursive: true},err => {                 // создаем
		if (err) { // Если какая-то ошибка — покажем
			console.error('Отмена операции: ' + err)
		} else { // Нет ошибки, поехали!

			console.log('Создание папки ' + dirPath + ' (создана, если ещё не существует)')

			// Обходим массив расширений и создаем файлы, если они еще не созданы
			extensions.forEach(extension => {

				let filePath = dirPath + blockName + '.' + extension // полный путь к создаваемому файлу
				let fileContent = ''                                 // будущий контент файла
				let fileCreateMsg = ''                               // будущее сообщение в консоли при создании файла

				// Если это scss
				if (extension === 'scss') {
					fileContent = `@use '../../scss/vars';\n\n.${blockName} {\n\t\n}`
					appendToFile(styleFile, `@use \'../blocks/${blockName}/${blockName}.scss\';\n`)
				}

				// Если это PUG
				if (extension === 'pug') {
					fileContent = `mixin ${blockName} ()`
					appendToFile(mixinsFile, `include ../blocks/${blockName}/${blockName}.pug\n`)
				}
				else if (extension === 'img') {
					const imgFolder = `${dirPath}img/`;
					if (fileExist(imgFolder) === false) {
						const made = mkdirp.sync(imgFolder);
						console.log(`Создание папки: ${made}`);
					} else {
						console.log(`Папка ${imgFolder} НЕ создана (уже существует) `);
					}
				}

				// Создаем файл, если он еще не существует
				if (fileExist(filePath) === false) {
					fs.writeFile(filePath, fileContent, err => {
						if (err) {
							return console.log('Файл НЕ создан: ' + err)
						}
						console.log('Файл создан: ' + filePath)
						if (fileCreateMsg) {
							console.warn(fileCreateMsg)
						}
					})
				} else {
					console.log('Файл НЕ создан: ' + filePath + ' (уже существует)')
				}
			})
		}
	})
} else {
	console.log('Отмена операции: не указан блок')
}

// Оставить в массиве только уникальные значения (убрать повторы)
function uniqueArray(arr) {
	let objectTemp = {}
	for (let i = 0; i < arr.length; i++) {
		let str = arr[i]
		objectTemp[str] = true // запомнить строку в виде свойства объекта
	}
	return Object.keys(objectTemp)
}

// Проверка существования файла
function fileExist(path) {
	try {
		fs.statSync(path)
		return true
	} catch (err) {
		return !(err && err.code === 'ENOENT')
	}
}

function appendToFile(file, content) {
	if (!fileExist(file)) {
		fs.writeFile(file, content, err => {})
	}

	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error(err)
		}

		if (data.indexOf(content) === -1) {
			fs.appendFile(file, content, err => {
				if (err) {
					console.error(err)
				}
			})
		}
	})
}
