const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a Successful Response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This Request has the Required Parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing valid Query Parameter Set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid Query Parameter Set to true';
    responseJSON.id = 'badRequest';
    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 400, responseString, 'application/json');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This Request has the Required Parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing loggedIn Query Parameter Set to yes</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn Query Parameter Set to yes';
    responseJSON.id = 'unauthorized';
    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 401, responseString, 'application/json');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'appliaction/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You Do Not Have Access to this Content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 403, responseString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 500, responseString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for update content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 501, responseString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 404, responseString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
