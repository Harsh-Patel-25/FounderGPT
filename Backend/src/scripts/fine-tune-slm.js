#!/usr/bin/env node

/**
 * Research SLM Fine-tuning Script
 * Fine-tunes a small language model for research paper analysis and startup idea enhancement
 *
 * Prerequisites:
 * - Node.js
 * - Python 3.8+
 * - transformers library
 * - datasets library
 * - torch
 *
 * Usage:
 * node src/scripts/fine-tune-slm.js
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import SLMTrainingData from '../utils/slmTrainingData.js';

class SLMFineTuner {
  constructor() {
    this.baseModel = 'microsoft/DialoGPT-small'; // Small, efficient model
    this.outputDir = './models/research-slm';
    this.trainingDataPath = './training-data';
  }

  /**
   * Prepare training data
   */
  async prepareData() {
    console.log('📊 Preparing training data...');

    const trainer = new SLMTrainingData();
    const result = trainer.saveTrainingData(this.trainingDataPath);

    // Generate additional real research data
    console.log('🔬 Loading real research papers...');
    const realData = await trainer.generateFromRealPapers([
      'artificial intelligence startups',
      'machine learning business',
      'innovation research',
      'technology entrepreneurship'
    ]);

    // Save real data
    const realDataPath = path.join(this.trainingDataPath, 'real-research.jsonl');
    fs.writeFileSync(realDataPath, realData.map(JSON.stringify).join('\n'));

    console.log(`✅ Training data prepared: ${result.trainingCount + realData.length} examples`);
    return result;
  }

  /**
   * Create Python training script
   */
  createTrainingScript() {
    const script = `
import json
import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import load_dataset
import numpy as np

def load_training_data(file_path):
    """Load JSONL training data"""
    data = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                data.append(json.loads(line))
    return data

def format_instruction(example):
    """Format data for instruction tuning"""
    if 'instruction' in example and 'input' in example:
        return f"Instruction: {example['instruction']}\\nInput: {example['input']}\\nOutput: {example['output']}"
    else:
        return example['text']

def main():
    print("🚀 Starting SLM fine-tuning...")

    # Load model and tokenizer
    model_name = "${this.baseModel}"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)

    # Add padding token if missing
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Load and prepare datasets
    train_data = load_training_data('./training-data/research-slm-train.jsonl')
    val_data = load_training_data('./training-data/research-slm-val.jsonl')

    # Convert to Hugging Face dataset format
    train_texts = [format_instruction(ex) for ex in train_data]
    val_texts = [format_instruction(ex) for ex in val_data]

    # Tokenize datasets
    def tokenize_function(examples):
        return tokenizer(
            examples['text'],
            truncation=True,
            padding='max_length',
            max_length=512
        )

    train_dataset = load_dataset('text', data_files={'train': train_texts})
    val_dataset = load_dataset('text', data_files={'validation': val_texts})

    tokenized_train = train_dataset.map(tokenize_function, batched=True)
    tokenized_val = val_dataset.map(tokenize_function, batched=True)

    # Training arguments
    training_args = TrainingArguments(
        output_dir='./models/research-slm',
        num_train_epochs=3,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=100,
        save_steps=500,
        evaluation_strategy="steps",
        eval_steps=500,
        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,
    )

    # Data collator
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False,
    )

    # Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train['train'],
        eval_dataset=tokenized_val['validation'],
        data_collator=data_collator,
    )

    print("🏃 Starting training...")
    trainer.train()

    # Save the fine-tuned model
    trainer.save_model('./models/research-slm-final')
    tokenizer.save_pretrained('./models/research-slm-final')

    print("✅ Fine-tuning completed! Model saved to ./models/research-slm-final")

if __name__ == "__main__":
    main()
`;

    const scriptPath = './scripts/fine-tune-slm.py';
    fs.writeFileSync(scriptPath, script);
    console.log(`📝 Training script created: ${scriptPath}`);
    return scriptPath;
  }

  /**
   * Run the fine-tuning process
   */
  async runFineTuning() {
    console.log('🎯 Starting SLM fine-tuning process...');

    // Prepare data
    await this.prepareData();

    // Create training script
    const scriptPath = this.createTrainingScript();

    // Run Python training script
    return new Promise((resolve, reject) => {
      console.log('🐍 Running Python training script...');

      const python = spawn('python', [scriptPath], {
        stdio: 'inherit',
        cwd: process.cwd()
      });

      python.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Fine-tuning completed successfully!');
          resolve();
        } else {
          console.error(`❌ Fine-tuning failed with code ${code}`);
          reject(new Error(`Training failed with exit code ${code}`));
        }
      });

      python.on('error', (error) => {
        console.error('❌ Failed to start training process:', error);
        reject(error);
      });
    });
  }

  /**
   * Validate fine-tuned model
   */
  async validateModel() {
    console.log('🔍 Validating fine-tuned model...');

    const testPrompts = [
      "Summarize: AI improves startup success by 40%",
      "Enhance idea: Basic chatbot with research on NLP",
      "Trends: Machine learning adoption in business"
    ];

    // This would load the fine-tuned model and test it
    // For now, just log that validation would happen here
    console.log('📋 Test prompts prepared for validation');
    console.log('💡 In production, load the fine-tuned model and test inference');
  }
}

// CLI interface
async function main() {
  const tuner = new SLMFineTuner();

  try {
    console.log('🤖 FounderGPT Research SLM Fine-tuning');
    console.log('=====================================');

    await tuner.runFineTuning();
    await tuner.validateModel();

    console.log('\n🎉 SLM fine-tuning process completed!');
    console.log('📁 Model saved to: ./models/research-slm-final');
    console.log('🔄 Update researchSLMService.js to use the new model');

  } catch (error) {
    console.error('❌ Fine-tuning failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  main();
}

export default SLMFineTuner;