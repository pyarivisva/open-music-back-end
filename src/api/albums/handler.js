class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });
    const response = h.response({
      status: 'success',
      data: { albumId },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: { album },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);
    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async postAlbumCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;

    await this._service.addAlbumCover(id, coverUrl);
    return h.response({ status: 'success', message: 'Sampul berhasil diunggah' }).code(201);
  }

  async postAlbumLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.addAlbumLike(credentialId, albumId);
    return h.response({ status: 'success', message: 'Berhasil like' }).code(201);
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const { count, source } = await this._service.getAlbumLikesCount(albumId);
    const response = h.response({ status: 'success', data: { likes: count } });
    if (source === 'cache') response.header('X-Data-Source', 'cache');
    return response;
  }
}
module.exports = AlbumsHandler;