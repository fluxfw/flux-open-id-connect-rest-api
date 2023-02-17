/** @typedef {import("../../../../../flux-authentication-backend-api/src/Adapter/Api/AuthenticationBackendApi.mjs").AuthenticationBackendApi} AuthenticationBackendApi */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */

export class RequestService {
    /**
     * @type {AuthenticationBackendApi}
     */
    #authentication_backend_api;
    /**
     * @type {HttpApi}
     */
    #http_api;

    /**
     * @param {AuthenticationBackendApi} authentication_backend_api
     * @param {HttpApi} http_api
     * @returns {RequestService}
     */
    static new(authentication_backend_api, http_api) {
        return new this(
            authentication_backend_api,
            http_api
        );
    }

    /**
     * @param {AuthenticationBackendApi} authentication_backend_api
     * @param {HttpApi} http_api
     * @private
     */
    constructor(authentication_backend_api, http_api) {
        this.#authentication_backend_api = authentication_backend_api;
        this.#http_api = http_api;
    }

    /**
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleApiRequest(request) {
        return (await import("../Command/HandleApiRequestCommand.mjs")).HandleApiRequestCommand.new(
            this.#authentication_backend_api,
            this.#http_api
        )
            .handleApiRequest(
                request
            );
    }

    /**
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleRequest(request) {
        return (await import("../Command/HandleRequestCommand.mjs")).HandleRequestCommand.new(
            this
        )
            .handleRequest(
                request
            );
    }
}
