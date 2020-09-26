
module.exports = (...args) => {
    const cssFilePaths = args.map(cssFileName => {
        if(cssFileName.startsWith('https://') || cssFileName.startsWith('http://') || cssFileName.startsWith('www.')){
            return cssFileName;
        }

        return `/styles/partials/${cssFileName}`;
    });

    return cssFilePaths;
}