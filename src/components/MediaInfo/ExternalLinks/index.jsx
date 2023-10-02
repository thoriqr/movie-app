

const ExternalLinks = () => {
  return (
    {/* <div className=" w-[10%] flex flex-row-reverse gap-2">
        <div className="">
          {media?.homepage ||
          media?.external_ids.imdb_id ||
          media?.external_ids.wikidata_id ? (
            <>
              <p className="font-semibold text-base">External Links:</p>
              <div className="flex gap-2 divide-x-2 divide-gray-500 mt-2">
                <div className="">
                  {media?.homepage ? (
                    <Link
                      to={media?.homepage}
                      target="_blank"
                      title="Visit Homepage"
                    >
                      <FontAwesomeIcon icon={faLink} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="pl-2 flex gap-3 items-center">
                  {media?.external_ids.imdb_id ? (
                    <Link
                      to={`https://www.imdb.com/title/${media?.external_ids.imdb_id}`}
                      target="_blank"
                      title="Visit IMDB"
                    >
                      <FontAwesomeIcon icon={faImdb} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                  {media?.external_ids.wikidata_id ? (
                    <Link
                      to={`https://www.wikidata.org/wiki/${media?.external_ids.wikidata_id}`}
                      target="_blank"
                      title="Visit WikiData"
                    >
                      <FontAwesomeIcon icon={faWikipediaW} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {media?.external_ids.facebook_id ||
          media?.external_ids.instagram_id ||
          media?.external_ids.twitter_id ? (
            <div className="mt-4">
              <p className="font-semibold text-base">Social Links:</p>
              <div className="flex gap-4 mt-2 items-center">
                {media?.external_ids.facebook_id ? (
                  <Link
                    to={`https://www.facebook.com/${media?.external_ids.facebook_id}`}
                    target="_blank"
                    title="Visit Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                  </Link>
                ) : (
                  ""
                )}
                {media?.external_ids.instagram_id ? (
                  <Link
                    to={`https://www.instagram.com/${media?.external_ids.instagram_id}`}
                    target="_blank"
                    title="Visit Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                  </Link>
                ) : (
                  ""
                )}
                {media?.external_ids.twitter_id ? (
                  <Link
                    to={`https://www.twitter.com/${media?.external_ids.twitter_id}`}
                    target="_blank"
                    title="Visit Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="xl" />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div> */}
  )
}

export default ExternalLinks