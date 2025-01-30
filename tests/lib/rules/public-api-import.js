import { RuleTester } from "eslint";
import rule from "../../../lib/rules/public-api-import.js";
import { aliasOptions } from "../../../helpers/index.js";

/**
 * @fileoverview External modules should be imported via public api
 * @author Abuzar
 */

const ruleTester = new RuleTester();

ruleTester.run("public-api-import", rule, {
  valid: [
    {
      code: 'import { module } from "../../lib/module"',
    },
    {
      code: 'import { article } from "~/entities/article"',
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      code: 'import { module } from "~/entities/article/lib/module"',
      errors: [{ messageId: "public-api-import" }],
      options: aliasOptions,
    },
  ],
});
