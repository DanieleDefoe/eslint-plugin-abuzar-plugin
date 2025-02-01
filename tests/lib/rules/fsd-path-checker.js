import { RuleTester } from "eslint";
import rule, { FSD_IMPORT_ERROR } from "../../../lib/rules/fsd-path-checker.js";
import { aliasOptions } from "../../../helpers/index.js";

/**
 * @fileoverview feature sliced design import checker
 * @author abuzar
 */

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
          messageId: FSD_IMPORT_ERROR,
        },
      ],
      options: aliasOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/entities/addCommentForm/lib/module.tsx",
      code: 'import { module } from "~/entities/addCommentForm/ui/addCommentForm/AddCommentForm.tsx"',
      errors: [
        {
          messageId: FSD_IMPORT_ERROR,
        },
      ],
      options: aliasOptions,
    },
  ],
});
