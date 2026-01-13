class AlbumsHandler {
  constructor(service, storageService, validator, uploadValidator) {
    this._service = service;
    this._storageService = storageService;
    this._validator = validator;
    this._uploadValidator = uploadValidator;
  }

  postAlbumHandler = async (request, h) => {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: { albumId },
    });
    response.code(201);
    return response;
  };

  getAlbumByIdHandler = async (request) => {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: { album },
    };
  };

  putAlbumByIdHandler = async (request) => {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  };

  deleteAlbumByIdHandler = async (request) => {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  };

  postUploadCoverHandler = async (request, h) => {
    const { cover } = request.payload;
    this._uploadValidator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;

    const { id } = request.params;
    await this._service.addCoverAlbumById(id, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  };

  postLikeHandler = async (request, h) => {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.addAlbumLike(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Menyukai album',
    });
    response.code(201);
    return response;
  };

  deleteLikeHandler = async (request) => {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteAlbumLike(credentialId, id);

    return {
      status: 'success',
      message: 'Batal menyukai album',
    };
  };

  getLikesHandler = async (request, h) => {
    const { id } = request.params;
    const { likes, source } = await this._service.getAlbumLikesCount(id);

    const response = h.response({
      status: 'success',
      data: { likes },
    });

    if (source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  };
}

module.exports = AlbumsHandler;