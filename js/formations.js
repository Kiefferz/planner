/**
 * Configuration des formations tactiques
 * Chaque formation définit quelles positions sont visibles et où elles sont placées
 */

const formations = {
    '4-2-3-1': {
        positions: ['gb', 'dg', 'dc-left', 'dc-right', 'dd', 'mdc-left', 'mdc-right', 'aig', 'moc', 'aid', 'bu'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dc-left': { top: '32%', left: '18%' },
            'dc-right': { top: '56%', left: '18%' },
            'dd': { top: '80%', left: '18%' },
            'mdc-left': { top: '32%', left: '44%' },
            'mdc-right': { top: '56%', left: '44%' },
            'aig': { top: '8%', left: '65%' },
            'moc': { top: '50%', left: '65%', transform: 'translateY(-50%)' },
            'aid': { top: '80%', left: '65%' },
            'bu': { top: '50%', right: '5%', transform: 'translateY(-50%)' }
        }
    },
    '3-4-3': {
        positions: ['gb', 'dg', 'dc', 'dd', 'mg', 'mcg', 'mcd', 'md', 'aig', 'bu', 'aid'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dc': { top: '50%', left: '18%', transform: 'translateY(-50%)' },
            'dd': { top: '80%', left: '18%' },
            'mg': { top: '8%', left: '44%' },
            'mcg': { top: '32%', left: '44%' },
            'mcd': { top: '56%', left: '44%' },
            'md': { top: '80%', left: '44%' },
            'aig': { top: '8%', left: '70%' },
            'bu': { top: '50%', left: '70%', transform: 'translateY(-50%)' },
            'aid': { top: '80%', left: '70%' }
        }
    },
    '3-5-2': {
        positions: ['gb', 'dc-top', 'dc-middle', 'dc-bottom', 'mdc-top', 'mdc-bottom', 'alg', 'moc', 'ald', 'bu-top', 'bu-bottom'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dc-top': { top: '20%', left: '18%' },
            'dc-middle': { top: '40%', left: '18%' },
            'dc-bottom': { top: '60%', left: '18%' },
            'mdc-top': { top: '20%', left: '35%' },
            'mdc-bottom': { top: '60%', left: '35%' },
            'alg': { top: '8%', left: '50%' },
            'moc': { top: '50%', left: '50%', transform: 'translateY(-50%)' },
            'ald': { top: '80%', left: '50%' },
            'bu-top': { top: '20%', left: '70%' },
            'bu-bottom': { top: '60%', left: '70%' }
        }
    },
    '4-3-3': {
        positions: ['gb', 'dg', 'dcg', 'dcd', 'dd', 'mg', 'mc', 'md', 'aig', 'bu', 'aid'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dcg': { top: '32%', left: '18%' },
            'dcd': { top: '56%', left: '18%' },
            'dd': { top: '80%', left: '18%' },
            'mg': { top: '8%', left: '44%' },
            'mc': { top: '50%', left: '44%', transform: 'translateY(-50%)' },
            'md': { top: '80%', left: '44%' },
            'aig': { top: '8%', left: '70%' },
            'bu': { top: '50%', left: '70%', transform: 'translateY(-50%)' },
            'aid': { top: '80%', left: '70%' }
        }
    },
    '4-1-3-2': {
        positions: ['gb', 'dg', 'dcg', 'dcd', 'dd', 'mdc', 'mg', 'moc', 'md', 'bu-left', 'bu-right'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dcg': { top: '32%', left: '18%' },
            'dcd': { top: '56%', left: '18%' },
            'dd': { top: '80%', left: '18%' },
            'mdc': { top: '50%', left: '35%', transform: 'translateY(-50%)' },
            'mg': { top: '8%', left: '55%' },
            'moc': { top: '50%', left: '55%', transform: 'translateY(-50%)' },
            'md': { top: '80%', left: '55%' },
            'bu-left': { top: '35%', left: '75%' },
            'bu-right': { top: '65%', left: '75%' }
        }
    },
    '4-4-2': {
        positions: ['gb', 'dg', 'dcg', 'dcd', 'dd', 'mg', 'mcg', 'mcd', 'md', 'bu-left', 'bu-right'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dcg': { top: '32%', left: '18%' },
            'dcd': { top: '56%', left: '18%' },
            'dd': { top: '80%', left: '18%' },
            'mg': { top: '8%', left: '44%' },
            'mcg': { top: '32%', left: '44%' },
            'mcd': { top: '56%', left: '44%' },
            'md': { top: '80%', left: '44%' },
            'bu-left': { top: '35%', left: '70%' },
            'bu-right': { top: '65%', left: '70%' }
        }
    },
    '4-1-4-1': {
        positions: ['gb', 'dg', 'dcg', 'dcd', 'dd', 'mdc', 'mg', 'mcg', 'mcd', 'md', 'bu'],
        layout: {
            'gb': { top: '50%', left: '5%', transform: 'translateY(-50%)' },
            'dg': { top: '8%', left: '18%' },
            'dcg': { top: '32%', left: '18%' },
            'dcd': { top: '56%', left: '18%' },
            'dd': { top: '80%', left: '18%' },
            'mdc': { top: '50%', left: '35%', transform: 'translateY(-50%)' },
            'mg': { top: '8%', left: '55%' },
            'mcg': { top: '32%', left: '55%' },
            'mcd': { top: '56%', left: '55%' },
            'md': { top: '80%', left: '55%' },
            'bu': { top: '50%', left: '75%', transform: 'translateY(-50%)' }
        }
    }
};

