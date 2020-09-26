
module.exports = (...args) => {
    const jsFilePaths = args.map(jsFileName => {
        if(jsFileName.startsWith('https://') || jsFileName.startsWith('http://') || jsFileName.startsWith('www.')){
            return jsFileName;
        }
        
        return `/js/${jsFileName}`;
    });

    return jsFilePaths;
}