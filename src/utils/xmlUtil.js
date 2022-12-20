import xmlFormat from 'xml-formatter';

const printXML = (sourceXml) => {
    var styledXml = xmlFormat(sourceXml);
    return styledXml;
};

const findXmlTag = (sourceXml, tag) => {
    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var tags = xmlDoc.getElementsByTagName(tag);

    var values = [];
    if(tags){
        for(var i = 0; i < tags.length; i++){
            if(tags[i].children && tags[i].children.length > 0){
                values.push(tags[i].children[0].innerHTML);
            }
        }
    }
    
    return values;
};

const replaceXmlTagValue = (sourceXml, tag, newValue) => {
    let xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    let tags = xmlDoc.getElementsByTagName(tag);

    let attributesNode = xmlDoc.getElementsByTagName("attributes")[0];

    let nodesToDelete = [];
    for (var i = 0; i < tags.length; i++){
        nodesToDelete.push(tags[i]);
    }

    nodesToDelete.forEach( (node) => {
        attributesNode.removeChild(node)
    } );
    nodesToDelete = [];

    let nodesToAdd = [];
    newValue.forEach((value) => {
        let subjectNode = xmlDoc.createElement("subject");
        subjectNode.textContent = value;

        let subjectsNode = xmlDoc.createElement(tag);  
        subjectsNode.appendChild(subjectNode);

        nodesToAdd.push(subjectsNode);
    });

    nodesToAdd.forEach( (node) => {
        attributesNode.appendChild(node)
    } );
    nodesToAdd = [];

    return new XMLSerializer().serializeToString(xmlDoc);
}

const unprettify = (sourceXml) => {
    sourceXml = '<?xml version="1.0" encoding="utf-8"?>' + sourceXml;
    var xmlDoc  = new DOMParser().parseFromString(sourceXml, "application/xml");
    var resultXml = new XMLSerializer().serializeToString(xmlDoc);
    return resultXml;
}

export { 
    printXML, 
    findXmlTag, 
    replaceXmlTagValue,
    unprettify
};