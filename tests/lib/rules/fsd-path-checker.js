/**
 * @fileoverview feature sliced design import checker
 * @author abuzar
 */
"use strict";

const rule = require("../../../lib/rules/fsd-path-checker"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("fsd-path-checker", rule, {
  valid: [
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/features/addCommentForm",
      code: 'import { module } from "../lib/module"',
    },
  ],

  invalid: [
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/features/addCommentForm",
      code: 'import { module } from "~/features/addCommentForm/lib/module"',
      errors: [
        {
          messageId: "fsd-relative-import-error",
        },
      ],
      options: [{ alias: "~" }],
    },
  ],
});
