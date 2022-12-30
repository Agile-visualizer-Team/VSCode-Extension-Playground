"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionEvaluator = void 0;
const CONDITION_OPERATORS = {
    matches: (condition, variables) => {
        return variables[condition.variable] === condition.matches;
    },
    imatches: (condition, variables) => {
        if (typeof condition.imatches !== 'string') {
            return false;
        }
        return variables[condition.variable].toUpperCase() === condition.imatches.toUpperCase();
    },
    contains: (condition, variables) => {
        return variables[condition.variable].indexOf(condition.contains) >= 0;
    },
    icontains: (condition, variables) => {
        if (typeof condition.icontains !== 'string') {
            return false;
        }
        return variables[condition.variable].toUpperCase().indexOf(condition.icontains.toUpperCase()) >= 0;
    },
    lt: (condition, variables) => {
        if (typeof condition.lt === 'undefined') {
            return false;
        }
        return variables[condition.variable] < condition.lt;
    },
    lte: (condition, variables) => {
        if (typeof condition.lte === 'undefined') {
            return false;
        }
        return variables[condition.variable] <= condition.lte;
    },
    gt: (condition, variables) => {
        if (typeof condition.gt === 'undefined') {
            return false;
        }
        return variables[condition.variable] > condition.gt;
    },
    gte: (condition, variables) => {
        if (typeof condition.gte === 'undefined') {
            return false;
        }
        return variables[condition.variable] >= condition.gte;
    }
};
class ExpressionEvaluator {
    constructor(expression) {
        this.expression = expression;
    }
    evaluate(variables) {
        for (let condition of this.expression.if) {
            if (this.evaluateIf(condition, variables)) {
                return condition.then;
            }
        }
        return this.expression.else;
    }
    // noinspection JSMethodCanBeStatic
    evaluateIf(condition, variables) {
        for (let operatorName in CONDITION_OPERATORS) {
            if (operatorName in condition) {
                return CONDITION_OPERATORS[operatorName](condition, variables);
            }
        }
        throw Error("Invalid/missing condition operator: " + JSON.stringify(condition));
    }
}
exports.ExpressionEvaluator = ExpressionEvaluator;
