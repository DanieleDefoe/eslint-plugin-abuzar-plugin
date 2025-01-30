import { RuleTester } from "eslint";
import rule from "../../../lib/rules/fsd-layer-imports.js";
import { aliasOptions } from "../../../helpers.js";

/**
 * @fileoverview Lower layers cannot import upper layers
 * @author Abuzar
 */

const ruleTester = new RuleTester();

ruleTester.run("fsd-layer-imports", rule, {
  valid: [
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/features/addCommentForm/lib/module.tsx",
      code: 'import { module } from "~/entities/addCommentForm"',
      options: aliasOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/widgets/addCommentForm/lib/module.tsx",
      code: 'import { helper } from "~/shared/lib"',
      options: aliasOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/widgets/addCommentForm/lib/module.tsx",
      code: 'import redux from "redux',
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/features/addCommentForm/lib/module.tsx",
      code: 'import { widget } from "~/widgets/addCommentForm"',
      options: aliasOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/shared/addCommentForm/lib/module.tsx",
      code: 'import { Provider } from "~/app/providers"',
      options: aliasOptions,
    },
  ],
});
