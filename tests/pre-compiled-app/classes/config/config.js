  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    config = (!!config) ? config : {};

    config.searchSettings = ( (!!config.searchSettings) ?
      config.searchSettings : {}
    );
    config.questionFormat = ( (!!config.questionFormat) ?
      config.questionFormat : {}
    );
    config.prettyCode = ( (!!config.prettyCode) ?
      config.prettyCode : {}
    );

    /**
     * ---------------------------------------------------
     * Public Property (Config.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Config class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Config',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'config= $$', config);
    this.debug.start('init', config);

    /**
     * ----------------------------------------------- 
     * Protected Property (Config.showURL)
     * -----------------------------------------------
     * @desc Indicates if formatted urls should be created for question
     *   ids and categories.
     * @type {boolean}
     * @private
     */
    var showURL;

    /**
     * ----------------------------------------------- 
     * Protected Property (Config.showLinks)
     * -----------------------------------------------
     * @desc Indicates if the question's links should be shown.
     * @type {boolean}
     * @private
     */
    var showLinks;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {SearchBarConfig}
     * @struct
     */
    this.searchBar;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {QuestionsConfig}
     * @struct
     */
    this.questions;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.pretty)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {PrettyConfig}
     * @struct
     */
    this.pretty;

    /**
     * ----------------------------------------------- 
     * Public Method (Config.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        showURL  : showURL,
        showLinks: showLinks
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Setup the properties
    showURL = (!!config.showURL && config.showURL === true);
    showLinks = (!!config.showLinks && config.showLinks === true);

    this.searchBar = new SearchBarConfig(config.searchSettings);
    this.questions = new QuestionsConfig(config.questionFormat);
    this.pretty = new PrettyConfig(config.prettyCode);

    Object.freeze(this.searchBar);
    Object.freeze(this.questions);
    Object.freeze(this.pretty);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;
