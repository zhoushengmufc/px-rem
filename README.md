# px-rem

a tool to convert px to rem 

##How to convert static files

    npm install px-rem -g
    
    px2rem
    
you can set a config
    
    px2rem --config pxrem.config.js

    
##config

default config:

```javascript
    {
	    patterns: "**/*.css",
        pxToRemRatio: 0.01,
        ignoreCss: [],
        isReplace: false,
        convertBorder1px: false
    }
```
    
you can create a new file in the current directory, for example: pxrem.config.js
    
```javascript
    module.exports = {
	    patterns: "./WrcIosselect/lib/WrcIosselect.css",
        pxToRemRatio: 0.01,
        ignoreCss: ['font-size', 'line-height'],
        isReplace: false,
        convertBorder1px: true
    };
```
    
then you can run like this: 
    
    px2rem --config pxrem.config.js
    
##parammeter

    patterns: visite https://www.npmjs.com/package/glob to see pattern
    
    pxToRemRatio: the ratio of px and rem

    ignoreCss: will not convert the CSS property
    
    isReplace: whether or not to replace the original file
    
    convertBorder1px: whether or not to convert 1 pixel wide border
    
    
---------------------------------------------------------------------------------------------------------------

##How to use as a webpack loader

package.json:

```javascript
    "devDependencies": {
        "px-rem": "*"
    }
```

    in webpack.config.js:

```javascript
    module.exports = {
        node: {
            fs: "empty"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!px-rem!postcss-loader!less-loader'
                }
            ]
        }
    }
```

If you use less-loader, sass-loader, postcss-loader and other processing tools, you need to put px-rem on their left


you must create a file called pxrem.webpack.conf.json in the project root directory (same directory with package.json) like this:

```javascript
    {
        "pxToRemRatio": 0.01,
        "ignoreCss": [],
        "convertBorder1px": true
    }
```

then you can convert px to rem in your project


-------------------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------------------------------



将px转换为rem的工具

##怎样转换静态文件
    
安装：
    
    npm install px-rem -g
    
然后跑下命令
    
    px2rem
    
    
你也可以设置一个配置文件

    
    
    px2rem --config pxrem.config.js
    
##config

默认 config:

```javascript
    {
	    patterns: "**/*.css",
        pxToRemRatio: 0.01,
        ignoreCss: [],
        isReplace: false,
        convertBorder1px: false
    }
```
    
你也可以在当前文件夹下新建一个配置文件, 比如: pxrem.config.js
    
```javascript
    module.exports = {
	    patterns: "./WrcIosselect/lib/WrcIosselect.css",
        pxToRemRatio: 0.01,
        ignoreCss: ['font-size', 'line-height'],
        isReplace: false,
        convertBorder1px: true
    };
```
    
然后你可以在命令行输入时作为参数带入： 
    
    px2rem --config pxrem.config.js
    
##参数说明

    patterns: 访问 https://www.npmjs.com/package/glob 然后查看patterns参数
    
    pxToRemRatio: px和rem的比值，默认0.01

    ignoreCss: 该数组内的css属性将不会被转换
    
    isReplace: 是否替换原来的文件，如果为true则替换，否则会在当前文件夹下生成一个原文件名 + '-px2rem' 的文件
    
    convertBorder1px: 是否转换1px宽度的border,默认不转换
    
##pxToRemRatio 说明
    
###如果你是使用adaptive.js,https://github.com/finance-sh/adaptive  或者使用1px设计图对应0.01rem的方法：

    
    1，如果是基于设计图开发，这个值就是0.01 
    
    
    2，如果是将width=device-width下，以px为单位的老css文件转换为rem, 如果新的设计图为640，这个值一般为 (1 * 2) / 100, 如果新的设计图为750，这个值为 (7 / 3 * 1) / 100
    
    
###如果你使用的是手淘解决方案Flexible或类似原理的自适应方案


    1，如果是基于设计图，这个值是 1 / (设计图宽度 / 10)
    
    
    2，如果是将width=device-width下，以px为单位的老css文件转换为rem, 如果新的设计图为640，这个值一般为 1 / (640 / 10) * 2, 如果新的设计图为750，这个值为 1 / (750 / 10) * 2.3333


##怎么在webpack中使用

package.json:

```javascript
    "devDependencies": {
        "px-rem": "*"
    }
```

    配置webpack.config.js:

```javascript
    module.exports = {
        node: {
            fs: "empty"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!px-rem!postcss-loader!less-loader'
                }
            ]
        }
    }
```

如果你使用less-loader,sass-loader,postcss-loader等处理性工具，你需要把px-rem放到它们的左边


你必须新建一个文件叫：pxrem.webpack.conf.json 在你的项目根目录 (和package.json同一文件夹下):

```javascript
    {
        "pxToRemRatio": 0.01,
        "ignoreCss": [],
        "convertBorder1px": true
    }
```

当你在webpack项目的开发环境使用时，它会自动将对应文件中的px转换为rem为单位（原文件并没有转换，内存中的对应文件转换，可以访问对应页面查看效果）

当你编译到生产环境时，对应的文件已经被转换

    
    
    
    
